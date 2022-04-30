import { queryDatabase } from '../../../database/connect';
import getQuestionsSurvey from '../../../utils/getQuestionsSurvey';

interface SurveyQueryParams {
  slug: string;
}

const surveyQueries = {
  surveys: async () => {
    return {
      results: async () => {
        const surveys: Survey[] = await queryDatabase({
          query: 'SELECT * FROM surveys ORDER BY created_at DESC',
        });

        return surveys.map(async (survey) => {
          const questionsSurveys: QuestionSurvey[] = await queryDatabase({
            query: 'SELECT * FROM questions_surveys WHERE survey_id = $1',
            params: [survey.id],
          });

          const questionsResults = await getQuestionsSurvey(questionsSurveys);

          return {
            id: survey.id,
            slug: survey.slug,
            questions: {
              results: questionsResults,
            },
            createdAt: survey.created_at,
            updatedAt: survey.updated_at,
          };
        });
      },
    };
  },
  survey: async (_: undefined, { slug }: SurveyQueryParams) => {
    const survey: Survey[] = await queryDatabase({
      query: 'SELECT * FROM surveys WHERE slug = $1 LIMIT 1',
      params: [slug],
    });

    const questionsSurveys: QuestionSurvey[] = await queryDatabase({
      query: 'SELECT * FROM questions_surveys WHERE survey_id = $1',
      params: [survey[0].id],
    });

    const questionsResults = await getQuestionsSurvey(questionsSurveys);

    return {
      id: survey[0].id,
      slug: survey[0].slug,
      questions: {
        results: questionsResults,
      },
      createdAt: survey[0].created_at,
      updatedAt: survey[0].updated_at,
    };
  },
};

export default surveyQueries;
