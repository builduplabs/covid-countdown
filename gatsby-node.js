exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
        type QuadranteCsv implements Node {
        date: Date
        rt_real: Float
        cases_by_100k_real: Float
      }
    `;
  createTypes(typeDefs);
};
