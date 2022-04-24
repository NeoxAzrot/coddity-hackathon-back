interface Timestamps {
  created_at: date;
  updated_at: date;
}

interface QueryParams {
  order: {
    by: string;
    direction: string;
  };
  limit: number;
  offset: number;
}
