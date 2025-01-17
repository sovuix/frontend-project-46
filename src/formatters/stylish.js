const indent = (depth) => '    '.repeat(depth);

const stylish = (nodeTree) => {
  const formatValue = (value, depth = 0) => {
    if (typeof value === 'object' && value !== null) {
      const entries = Object.entries(value).map(([key, val]) => `${indent(depth + 1)}${key}: ${formatValue(val, depth + 1)}`);
      return `{\n${entries.join('\n')}\n${indent(depth)}}`;
    }
    if (typeof value === 'string') {
      return `${value}`;
    }
    return String(value);
  };

  const iter = (node, depth = 0) => {
    const { type } = node;

    if (type === 'added') {
      return [`${indent(depth).slice(0, -2)}+ ${node.key}: ${formatValue(node.value, depth)}`];
    } if (type === 'changed') {
      return [
        `${indent(depth).slice(0, -2)}- ${node.key}: ${formatValue(node.oldValue, depth)}`,
        `${indent(depth).slice(0, -2)}+ ${node.key}: ${formatValue(node.newValue, depth)}`,
      ];
    } if (type === 'nested') {
      return [`${indent(depth)}${node.key}: {\n${node.children.flatMap((child) => iter(child, depth + 1)).join('\n')}\n${indent(depth)}}`];
    } if (type === 'deleted') {
      return [`${indent(depth).slice(0, -2)}- ${node.key}: ${formatValue(node.value, depth)}`];
    } if (type === 'notModified') {
      return [`${indent(depth)}${node.key}: ${formatValue(node.value, depth)}`];
    }

    return '';
  };

  if (nodeTree.type === 'root') {
    return `{\n${nodeTree.children.flatMap((child) => iter(child, 1)).join('\n')}\n}`;
  }

  return '';
};

export default stylish;
