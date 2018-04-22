import { GraphQLScalarType } from 'graphql';

import secure from '../utils/secure';
import Post from '../controllers/Post';
import User from '../controllers/User';

export default {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date type',
    parseValue(value) {
      return new Date(value).getTime();
    },
    serialize(value) {
      return new Date(value);
    },
    parseLiteral(ast) {
      return new Date(ast.value).getTime();
    },
  }),

  Query: {
    posts: () => Post.readAll(),
    postById: (root, args) => Post.readById(args.id),
  },

  Mutation: {
    createPost: secure((root, args, context) => Post.create(args.lease, context.user)),
    register: (root, args) => User.create(args.email),
  },
};
