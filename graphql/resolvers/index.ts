import { surveyMutations, surveyQueries } from './survey';
import { userMutations, userQueries } from './user';

const resolvers = {
  Query: {
    ...surveyQueries,
    ...userQueries,
  },
  Mutation: {
    ...surveyMutations,
    ...userMutations,
  },
};

export default resolvers;
