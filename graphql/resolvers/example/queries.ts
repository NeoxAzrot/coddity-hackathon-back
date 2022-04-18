interface ExampleQueriesParamsTypes {
  id: string;
}

const exampleQueries = {
  examples: async () => {},
  example: async (_: undefined, { id }: ExampleQueriesParamsTypes) => {
    return {
      id,
    };
  },
};

export default exampleQueries;
