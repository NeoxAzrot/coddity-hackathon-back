import { exampleMutations, exampleQueries } from './example';

const resolvers = {
  Query: {
    ...exampleQueries,
  },
  Mutation: {
    ...exampleMutations,
  },
};

export default resolvers;
