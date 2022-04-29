import { queryDatabase } from 'database/connect';

const getQuestions = async (questionsSurveys: QuestionSurvey[]) => {
  const questionsResults = questionsSurveys.map(async (questionSurvey) => {
    const question: Question[] = await queryDatabase({
      query: 'SELECT * FROM questions WHERE id = $1',
      params: [questionSurvey.question_id],
    });

    const answers: Answer[] = await queryDatabase({
      query: 'SELECT * FROM answers WHERE question_id = $1',
      params: [questionSurvey.question_id],
    });

    const answersResults = answers.map((answer) => {
      return {
        id: answer.id,
        answer: answer.answer,
        correct: answer.correct,
        createdAt: answer.created_at,
        updatedAt: answer.updated_at,
      };
    });

    return {
      id: question[0].id,
      question: question[0].question,
      explanation: question[0].explanation,
      answers: {
        results: answersResults,
      },
      createdAt: question[0].created_at,
      updatedAt: question[0].updated_at,
    };
  });

  return questionsResults;
};

export default getQuestions;
