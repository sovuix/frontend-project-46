
const compareAst = (node) => {
  const formatValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      // TODO: неправильно, JSON.stringify не учитывает отступы
      return JSON.stringify(value, null, 2);
    }
    if (typeof value === 'string') {
      return `"${value}"`;
    }

    return String(value);
  };

  const iter = (node, depth = 0) => {
    const indent = '  '.repeat(depth);
    const { type } = node;

    if (type === 'added') {
      return [`${indent}+ ${node.key}: ${formatValue(node.value)}`];
    } else if (type === 'changed') {
      return [
          `${indent}- ${node.key}: ${formatValue(node.oldValue)}`,
          `${indent}+ ${node.key}: ${formatValue(node.newValue)}`,
      ];
    } else if (type === 'nested') {
      return [`${indent}${node.key}: {\n${node.children.flatMap((child) => iter(child, depth + 1)).join(`\n`)}\n${indent}}`];
    } else if (type === 'deleted') {
      return [`${indent}- ${node.key}: ${formatValue(node.value)}`];
    } else if (type === 'notModified') {
      return [`${indent}  ${node.key}: ${formatValue(node.value)}`];
    }

    return '';
  }

  if (node.type === 'root') {
    return `{\n${node.children.flatMap((child) => iter(child, 1)).join('\n')}\n}`;
  }

  return '';
};

// console.log(compareAst(ast));

export default compareAst;