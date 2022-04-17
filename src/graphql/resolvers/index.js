'use strict';
const _ = require('lodash');
const Person = require('../../models/Person');
const Parent = require('../../models/Parent');
const Family = require('../../models/Family');
const { to } = require('../../utils');
const mongoose = require('mongoose');
const prepare = (o) => {
  o._id = o._id.toString();
  return o;
};
module.exports = {
  persons: async ({ limit, index }) => {
    limit = limit ?? 999;
    index = index ?? 0;
    try {
      const res = (await Person.find().limit(parseInt(limit)).skip(parseInt(index))).map(prepare);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  person: async (args) => {
    const { id } = args;
    try {
      const res = await Person.findById(id);
      return res;
    } catch (error) {
      throw error;
    }
  },

  families: async ({ index, limit }) => {
    limit = limit ?? 999;
    index = index ?? 0;
    try {
      const res = (
        await Family.aggregate([
          {
            $lookup: {
              from: 'individuals',
              localField: 'father',
              foreignField: '_id',
              as: 'father',
            },
          },
          {
            $lookup: {
              from: 'individuals',
              localField: 'mother',
              foreignField: '_id',
              as: 'mother',
            },
          },
          {
            $lookup: {
              from: 'individuals',
              localField: 'children',
              foreignField: '_id',
              as: 'children',
            },
          },
          {
            $unwind: { path: '$mother', preserveNullAndEmptyArrays: true },
          },
          {
            $unwind: { path: '$father', preserveNullAndEmptyArrays: true },
          },
        ])
          .allowDiskUse(true)
          .limit(parseInt(limit))
          .skip(parseInt(index))
      ).map(prepare);
      console.log(res);
      return res;
    } catch (error) {
      throw error;
    }
  },

  family: async ({ id, as }) => {
    if (as === 'child') {
      as = {
        children: { $elemMatch: { _id: mongoose.Types.ObjectId(id) } },
      };
    } else {
      if (as === 'father') {
        as = { father: mongoose.Types.ObjectId(id) };
      } else {
        as = { mother: mongoose.Types.ObjectId(id) };
      }
    }
    try {
      const res = await Family.aggregate([
        {
          $match: {
            ...as,
          },
        },
        {
          $lookup: {
            from: 'individuals',
            localField: 'father',
            foreignField: '_id',
            as: 'father',
          },
        },
        {
          $lookup: {
            from: 'individuals',
            localField: 'mother',
            foreignField: '_id',
            as: 'mother',
          },
        },
        {
          $lookup: {
            from: 'individuals',
            localField: 'children',
            foreignField: '_id',
            as: 'children',
          },
        },
        {
          $unwind: { path: '$mother', preserveNullAndEmptyArrays: true },
        },
        {
          $unwind: { path: '$father', preserveNullAndEmptyArrays: true },
        },
      ]);
      return { ...(res[0] || null) };
    } catch (error) {
      throw error;
    }
  },
  //Mutation
  createPerson: async (args) => {
    try {
      const res = await Person.create(args.person);
      return res;
    } catch (error) {
      throw error;
    }
  },

  createFamily: async (args) => {
    try {
      const res = await Family.create(args.family);
      return res;
    } catch (error) {
      throw error;
    }
  },

  updatePerson: async (args) => {
    try {
      const res = await Person.findByIdAndUpdate(args.id, { $set: args.person }, { new: true });
      return res;
    } catch (error) {
      throw error;
    }
  },

  updateFamily: async (args) => {
    try {
      const res = await Family.findByIdAndUpdate(args.id, { $set: args.family }, { new: true });
      return res;
    } catch (error) {
      throw error;
    }
  },

  deletePerson: async (args) => {
    const { id } = args;
    let [error, res] = await to(Person.findByIdAndDelete(id));
    if (error) throw new Error(error);
    if (_.isEmpty(res)) return 'Person not found';
    [error] = await to(
      Family.deleteMany({
        $or: [
          {
            father: mongoose.Types.ObjectId(res._id),
          },
          {
            mother: mongoose.Types.ObjectId(res._id),
          },
          {
            children: { $elemMatch: { _id: mongoose.Types.ObjectId(id) } },
          },
        ],
      })
    );
    if (error) throw new Error(error);
    return 'Successfully deleted';
  },

  deleteFamily: async (args) => {
    try {
      const res = await Family.findByIdAndDelete(args.id);
      if (_.isEmpty(res)) return 'Family not found';
      return 'Successfully deleted';
    } catch (error) {
      throw error;
    }
  },
};
