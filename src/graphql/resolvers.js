import { GraphQLScalarType } from 'graphql';

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
    helloWorld: () => Date.now(),
  },
};
