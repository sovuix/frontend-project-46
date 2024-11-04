
// const mapping = {
//   added: (node, depth) => {},
//   deleted: (node, depth) => {},
// }
// const res = mapping[node, type](node, depth)

// 

const compareAst = (node) => {
  const res = [];

  const iter = (node, depth = 0) => {
    const indent = '  '.repeat(depth); // Используем два пробела для отступа

    if (node.type === 'added') {
      res.push(`${indent}+ ${node.key}: ${node.value}`);
    } else if (node.type === 'changed') {
      res.push(`${indent}+ ${node.key}: ${node.newvalue}`);
      res.push(`${indent}- ${node.key}: ${node.oldvalue}`); // Используем '-' для oldvalue
    } else if (node.type === 'nested') {
      res.push(`${indent}${node.key}: {`);
      node.children.forEach(child => iter(child, depth + 1)); // Используем forEach для корректного добавления
      res.push(`${indent}}`);
    } else if (node.type === 'removed'){ // Добавлено обработка удаленных узлов
        res.push(`${indent}- ${node.key}`)
    }
  };

  iter(node); // Вызываем iter для корневого узла
  return res
};

export default compareAst;