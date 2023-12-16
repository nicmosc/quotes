// See https://astexplorer.net/#/gist/f44789d54e577e2402f8dea63dfb3c64/b4a62e05c62ef8e5709ca884edf26a5f326abe63
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Warn about strict nullish equality',
      category: 'Possible Errors',
      recommended: true,
    },
    messages: {
      noStrictNullishEquality: `
ℹ️ We shouldn't strictly check for equality against nullish values (null/undefined) as doing so will require you to always check against both undefined and null.
Additionally, casting to null using the loose equality equality means we don't have to care of the value type, all we want to know if it has a value or not.
Replace the \`===\` with \`==\`, and don't check against \`undefined\`.
`,
    },
  },

  create: (context) => {
    const sourceCodeGetter = context.getSourceCode();

    return {
      BinaryExpression(node) {
        const isWrongCheck = getIsWrongCheck(node);
        if (isWrongCheck) {
          const startLine = node.loc.start.line;
          context.report({
            loc: node.loc,
            messageId: 'noStrictNullishEquality',
          });
        }
      },
    };
  },
};

function getIsWrongCheck(node) {
  const isStrictCheck = node.operator === '===' && (node.right.raw === 'null' || node.right.name === 'undefined');
  const isLooseUndefinedCheck = node.operator === '==' && node.right.name === 'undefined';

  return isStrictCheck || isLooseUndefinedCheck;
}