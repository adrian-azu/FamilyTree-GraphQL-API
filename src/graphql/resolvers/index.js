'use strict';
const _ = require('lodash');
const Person = require('../../models/Person');
const Parent = require('../../models/Parent');
const Family = require('../../models/Family');
const { metadata, paginate } = require('../../utils');
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

  // parents: async ({ limit, index }) => {
  //   try {
  //     return (await Parent.find().limit(parseInt(limit)).skip(parseInt(index))).map(prepare);
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // parent: async (args) => {
  //   const { id } = args;
  //   try {
  //     const res = await Parent.findById(id);
  //     return res;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // personParents: async (args) => {
  //   const { id } = args;
  //   try {
  //     const res = await Parent.aggregate([
  //       {
  //         $match: {
  //           personId: mongoose.Types.ObjectId(id),
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: 'individuals',
  //           localField: 'parentId',
  //           foreignField: '_id',
  //           as: 'parentId',
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: 'individuals',
  //           localField: 'personId',
  //           foreignField: '_id',
  //           as: 'person',
  //         },
  //       },
  //       {
  //         $unwind: '$parentId',
  //       },
  //       {
  //         $unwind: '$person',
  //       },
  //       {
  //         $unset: 'personId',
  //       },
  //       {
  //         $group: {
  //           _id: '$person',
  //           type: { $addToSet: '$type' },
  //           parents: {
  //             $push: {
  //               _id: '$parentId._id',
  //               type: '$type',
  //               firstName: '$parentId.firstName',
  //               lastName: '$parentId.lastName',
  //               gender: '$parentId.gender',
  //               born: '$parentId.born',
  //               died: '$parentId.died',
  //             },
  //           },
  //         },
  //       },
  //       {
  //         $project: {
  //           _id: '$_id._id',
  //           firstName: '$_id.firstName',
  //           lastName: '$_id.lastName',
  //           gender: '$_id.gender',
  //           born: '$_id.born',
  //           died: '$_id.died',
  //           parents: 1,
  //         },
  //       },
  //     ]);
  //     return res;
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // },

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
            $unwind: '$mother',
          },
          {
            $unwind: '$father',
          },
        ])
          .allowDiskUse(true)
          .limit(parseInt(limit))
          .skip(parseInt(index))
      ).map(prepare);
      return res;
    } catch (error) {
      throw error;
    }
  },

  family: async (args) => {
    const { familyName } = args;
    try {
      const res = await Family.aggregate([
        { $match: { familyName } },
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
          $unwind: '$mother',
        },
        {
          $unwind: '$father',
        },
      ]);

      return res;
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
      const res = await Person.findByIdAndUpdate(args.id, { $set: args.person });
      return res;
    } catch (error) {
      throw error;
    }
  },

  updateFamily: async (args) => {
    try {
      const res = await Family.findByIdAndUpdate(args.id, { $set: args.family });
      return res;
    } catch (error) {
      throw error;
    }
  },

  deletePerson: async (args) => {
    try {
      const { id } = args;
      const res = await Person.findByIdAndDelete(id);
      return res;
    } catch (error) {
      throw error;
    }
  },

  deleteFamily: async (args) => {
    try {
      const res = await Family.findByIdAndDelete(args.id);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
