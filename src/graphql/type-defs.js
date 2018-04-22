export default [
  `
scalar Date

enum PostStatus {
  Active
  Hidden
}

type Post {
  id: ID!
  user: ID!
  address: String!
  building: String
  state: String!
  city: String!
  description: String!
  price: Int!
  from: Date!
  to: Date
  bedrooms: Int!
  bathrooms: Int
  pictureId: String!
  pictureNumber: Int!
  type: String!
  status: PostStatus!
  updatedAt: Date!
  createdAt: Date!
}

type Query {
  posts: [Post]!
  postById(id: ID!): Post
}

input LeaseInput {
  address: String!
  building: String
  state: String!
  city: String!
  description: String!
  price: Int!
  from: Date!
  to: Date
  bedrooms: Int!
  bathrooms: Int
  pictureId: String!
  pictureNumber: Int!
  type: String!
}

type Mutation {
  createPost(lease: LeaseInput!): Post!
  register(email: String!): String!
}
`,
];
