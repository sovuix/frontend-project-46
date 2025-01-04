
const compareAst = (node) => {
  const indent = (depth) => '    '.repeat(depth);
  const formatValue = (value, depth = 0) => {
    if (typeof value === "object" && value !== null) {
      const entries = Object.entries(value).map(([key, val]) => {
        return `${indent(depth + 1)}${key}: ${formatValue(val, depth + 1)}`
      })
      return `{\n${entries.join('\n')}\n${indent(depth)}}`;
    }
    if (typeof value === 'string') {
      return `${value}`;
    }
    return String(value);
  }

  const iter = (node, depth = 0) => {
    // const indent = (depth, count = 0) => '    '.repeat(depth);
    const indent = (depth) => '    '.repeat(depth);

    const { type } = node;

    if (type === 'added') {
      return [`${indent(depth).slice(0, -2)}+ ${node.key}: ${formatValue(node.value, depth)}`];
    } else if (type === 'changed') {
      return [
        `${indent(depth).slice(0, -2)}- ${node.key}: ${formatValue(node.oldValue, depth)}`,
        `${indent(depth).slice(0, -2)}+ ${node.key}: ${formatValue(node.newValue, depth)}`,
      ];
    } else if (type === 'nested') {
      return [`${indent(depth)}${node.key}: {\n${node.children.flatMap((child) => iter(child, depth + 1)).join(`\n`)}\n${indent(depth)}}`];
    } else if (type === 'deleted') {
      return [`${indent(depth).slice(0, -2)}- ${node.key}: ${formatValue(node.value, depth)}`];
    } else if (type === 'notModified') {
      return [`${indent(depth)}${node.key}: ${formatValue(node.value, depth)}`];
    }

    return '';
  }

  if (node.type === 'root') {
    return `{\n${node.children.flatMap((child) => iter(child, 1)).join('\n')}\n}`;
  }

  return '';
};


export default compareAst;