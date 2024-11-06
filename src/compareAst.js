
// const mapping = {
//   added: (node, depth) => {},
//   deleted: (node, depth) => {},
// }
// const res = mapping[node, type](node, depth)

// 

const compareAst = (node) => { 
  const res = []; 
 
  const formatValue = (value) => { 
    if (typeof value === 'object') { 
      return JSON.stringify(value, null, 2); 
    } 
    return value; 
  }; 
 
  const iter = (node, depth = 0) => { 
    const indent = '  '.repeat(depth); 
 
    if (node.type === 'added') { 
      res.push(`${indent}+ ${node.key}: ${formatValue(node.value)}`); 
    } else if (node.type === 'changed') { 
      res.push(`${indent}- ${node.key}: ${formatValue(node.oldValue)}`); 
      res.push(`${indent}+ ${node.key}: ${formatValue(node.newValue)}`); 
    } else if (node.type === 'nested') { 
      res.push(`${indent}${node.key}: {`); 
      node.children.map((child) => iter(child, depth + 2)); 
      res.push(`${indent}}`); 
    } else if (node.type === 'deleted') { 
      res.push(`${indent}- ${node.key}`); 
    } else if (node.type === 'notModified') { 
      res.push(`${indent} ${node.key}: ${formatValue(node.value)}`); 
    } 
  }; 
 
  if (node.type === 'root') { 
    res.push(node.key); 
    node.children.forEach((child) => iter(child, 0)); 
  } else { 
    iter(node, 0); 
  } 
   
  return res.join('\n'); 
};

export default compareAst;