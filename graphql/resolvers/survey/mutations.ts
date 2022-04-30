import { queryDatabase } from '../../../database/connect';

const surveyMutations = {
  createSurvey: async () => {
    const survey: Survey[] = await queryDatabase({
      query: 'INSERT INTO surveys DEFAULT VALUES RETURNING *',
    });

    const questions: Question[] = await queryDatabase({
      query: 'SELECT * FROM questions ORDER BY RANDOM() LIMIT 20',
    });

    questions.forEach(async (question) => {
      await queryDatabase({
        query: 'INSERT INTO questions_surveys (question_id, survey_id) VALUES ($1, $2)',
        params: [question.id, survey[0].id],
      });
    });

    return {
      id: survey[0].id,
      slug: survey[0].slug,
      createdAt: survey[0].created_at,
      updatedAt: survey[0].updated_at,
    };
  },
};

export default surveyMutations;
