'use strict';
const { buildSchema } = require('graphql');
// type ParentPerson {
//   _id: ID!
//   type: String!
//   firstName: String!
//   lastName: String!
//   gender: Gender!
//   born: Date!
//   died: Date
// }
//
// type Parent {
//   _id: ID!
//   mother: ID!
//   father: ID!
// }

// input ParentInput {
//   mother: ID!
//   father: ID!
// }
// parents(limit: Int!, index: Int!): [Parent]
// parent(id: ID!): Parent
// personParents(id: ID!): [PersonParent!]
// createParent(parent: ParentInput!): Parent
// updateParent(id: ID!, parent: ParentInput!): Parent
module.exports = buildSchema(`
scalar Date
type Person {
  _id: ID!
  firstName: String!
  lastName: String!
  gender: Gender!
  born: Date!
  died: Date
}

enum Gender {
  Male
  Female
  Other
}

enum Member{
  child
  father
  mother
}

input PersonInput {
  firstName: String
  lastName: String
  gender: Gender
  born: Date
  died: Date
}

type Family {
  _id: ID!
  familyName: String!
  mother: Person
  father: Person
  children: [Person]
}

input FamilyInput {
  familyName: String
  mother: ID
  father: ID
  children: [ID!]
}

type Query {
  persons(limit: Int, index: Int): [Person]
  person(id: ID!): Person
  families(limit: Int, index: Int): [Family]
  family(id: ID!, as: Member!): Family
}

type Mutation {
  createPerson(person: PersonInput!): Person
  createFamily(family: FamilyInput!): Family
  updatePerson(id: ID!, person: PersonInput!): Person
  updateFamily(id: ID!, family: FamilyInput!): Family
  deletePerson(id: ID!): String
  deleteParent(id: ID!): String
  deleteFamily(id: ID!): String
}

schema {
  query: Query
  mutation: Mutation
}
`);
String