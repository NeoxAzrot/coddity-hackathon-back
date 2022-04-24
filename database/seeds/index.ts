import { readFileSync } from 'fs';

import { pool, queryDatabase } from 'database/connect';

interface Seeds {
  data: {
    question: string;
    answers: string[];
    correct: number;
    explanation: string;
  }[];
}

const seeds = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const json: Seeds = JSON.parse(readFileSync('database/seeds/data.json') as any);
  const { data } = json;

  console.log(`⏳ Generating \u001b[1;34m${data.length}\u001b[0m questions`);

  for (const item of data) {
    const { question, answers, correct, explanation } = item;

    await queryDatabase({
      query: 'INSERT INTO questions (question, explanation) VALUES ($1, $2) RETURNING id',
      params: [question, explanation],
    }).then(async (res) => {
      const questionId = res[0].id;

      for (const [index, answer] of answers.entries()) {
        await queryDatabase({
          query: 'INSERT INTO answers (answer, correct, question_id) VALUES ($1, $2, $3)',
          params: [answer, index === correct, questionId],
        });
      }
    });
  }

  console.log('✅ Successfully generated');
  pool.end();
};

seeds();
