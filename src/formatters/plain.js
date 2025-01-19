const formatValue = (value) => {
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'object') {
    return '[complex value]';
  }
  return String(value);
};

const plain = (nodeTree) => {
  const iter = (node, path = []) => {
    const { type } = node;
    const fullPath = [...path, node.key].join('.');

    switch (type) {
      case 'added':
        return `Property '${fullPath}' was added with value: ${formatValue(node.value)}`;
      case 'deleted':
        return `Property '${fullPath}' was removed`;
      case 'changed':
        return `Property '${fullPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
      case 'nested':
        return node.children
          .map((child) => iter(child, [...path, node.key]))
          .filter(Boolean)
          .join('\n');
      case 'notModified':
        return '';
      default:
        return '';
    }
  };

  if (nodeTree.type === 'root') {
    return nodeTree.children
      .map((child) => iter(child, []))
      .filter(Boolean)
      .join('\n');
  }

  return '';
};

export default plain;
