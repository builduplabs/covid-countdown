const path = require("path");
const gdeStamps = require("./timestamps.json");

const posixSlash = (input = "") => input.split(path.sep).join(path.posix.sep);

/**
 * @param {import("gatsby").CreateNodeArgs} onCreateNodeArgs
 */
exports.onCreateNode = ({ node, getNode, actions }) => {
  /** @type {import('gatsby').Node & import('fs').Stats & {absolutePath: string}} */
  const fileNode = getNode(node.parent);

  if (
    (node.internal.type === "PredictionCsv" ||
      node.internal.type === "QuadranteCsv") &&
    fileNode
  ) {
    let stamps = {
      createdMs: fileNode.birthtimeMs,
      modifiedMs: fileNode.mtimeMs,
    };

    const filePathRelativeToRoot = posixSlash(fileNode.absolutePath).replace(
      `${posixSlash(__dirname)}/`,
      ""
    );

    const stampEntry = gdeStamps[filePathRelativeToRoot];

    if (stamps && stampEntry.created) {
      stamps = {
        createdMs: stampEntry.created * 1000,
        modifiedMs: stampEntry.modified * 1000,
      };
    }

    for (const key in stamps) {
      actions.createNodeField({
        node,
        name: key,
        value: stamps[key],
      });
    }
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
        type DataUpdateFields { 
            createdMs: Float
            modifiedMs: Float
        }

        interface DataUpdate {
            fields: DataUpdateFields
        }  
  
        type QuadranteCsv implements Node & DataUpdate {
            date: Date
            rt_real: Float
            cases_by_100k_real: Float
            fields: DataUpdateFields
        }

        type PredictionCsv implements Node & DataUpdate {
            fields: DataUpdateFields
        }
    `;
  createTypes(typeDefs);
};

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Query: {
      allDataUpdates: {
        type: ["DataUpdate"],
        resolve(source, args, context, info) {
          return context.nodeModel
            .runQuery({
              type: "DataUpdate",
              query: {
                sort: {
                  fields: ["fields.modifiedMs"],
                  order: ["DESC"],
                },
              },
            })
            .then((result) => [result[0]]);
        },
      },
    },
  };

  createResolvers(resolvers);
};
