import { queryDatabase } from 'database/connect';

interface CreateUserMutationParams {
  params: {
    username: string;
    score: number;
    surveyId: number;
  };
}

const userMutations = {
  createUser: async (
    _: undefined,
    { params: { username, score, surveyId } }: CreateUserMutationParams,
  ) => {
    const user: User[] = await queryDatabase({
      query: 'INSERT INTO users (username, score, survey_id) VALUES ($1, $2, $3) RETURNING *',
      params: [username, score, surveyId],
    });

    return {
      id: user[0].id,
      username: user[0].username,
      score: user[0].score,
      createdAt: user[0].created_at,
      updatedAt: user[0].updated_at,
    };
  },
};

export default userMutations;
