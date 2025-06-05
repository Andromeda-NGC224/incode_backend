/** @type {import('@typescript-eslint/utils').TSESLint.RuleModule<'missingBase', []>} */
export const noUnboundControllerRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Controller classes must extend AbstractController',
    },
    messages: {
      missingBase: 'Controller "{{ name }}" must extend AbstractController.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      ClassDeclaration(node) {
        const className = node.id?.name;
        if (!className || className === 'AbstractController') return;

        const isController =
          className.endsWith('Controller') ||
          className.endsWith('controllerClass');
        if (!isController) return;

        const superClass = node.superClass;
        const isExtendingAbstract =
          (superClass?.type === 'Identifier' &&
            superClass.name === 'AbstractController') ||
          (superClass?.type === 'MemberExpression' &&
            superClass.property.type === 'Identifier' &&
            superClass.property.name === 'AbstractController');

        if (!isExtendingAbstract) {
          context.report({
            node,
            messageId: 'missingBase',
            data: { name: className },
          });
        }
      },
    };
  },
};
