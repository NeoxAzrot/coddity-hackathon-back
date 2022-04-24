interface User extends Timestamps {
  id: number;
  username: string;
  score: number;
  survey_id: number;
}
