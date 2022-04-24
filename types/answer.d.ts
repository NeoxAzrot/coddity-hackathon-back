interface Answer extends Timestamps {
  id: number;
  answer: string;
  correct: boolean;
  question_id: number;
}
