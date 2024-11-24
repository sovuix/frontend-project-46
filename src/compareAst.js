
const compareAst = (node) => {
  const indent = (depth) => '  '.repeat(depth);
  const formatValue = (value, depth = 0) => {
    if(typeof value === "object" && value !== null) {
      const entries = Object.entries(value).map(([key, val]) => {
        return `${indent(depth + 1)}${key}: ${formatValue(val, depth + 1)}`
      })
      return `{\n${entries.join('\n')}\n${indent(depth)}}`;
    }
    if (typeof value === 'string') {
      return `"${value}"`;
    }
    return  String(value);
  }

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