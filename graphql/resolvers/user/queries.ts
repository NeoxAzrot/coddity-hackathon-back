import { queryDatabase } from 'database/connect';

interface UserBySurveyIdQueryParams {
  id: string;
}

const userQueries = {
  usersBySurveyId: async (_: undefined, { id }: UserBySurveyIdQueryParams) => {
    return {
      results: async () => {
        const users: User[] = await queryDatabase({
          query: 'SELECT * FROM users WHERE survey_id = $1 ORDER BY score DESC',
          params: [id],
        });

        return users.map((user) => {
          return {
            id: user.id,
            username: user.username,
            score: user.score,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
          };
        });
      },
    };
  },
};

export default userQueries;
