import _ from 'lodash';

const compareKeys = (obj1, obj2) => {
  const keys1 = _.sortBy(Object.keys(obj1));
  const keys2 = _.sortBy(Object.keys(obj2));
  const result = [];

  for (const key of keys1) {
    if (!(key in obj2)) {
      result.push(`- ${key}: ${obj1[key]}`);
    } else if (obj1[key] !== obj2[key]) {
      result.push(`- ${key}: ${obj1[key]}`);
    } else if (obj1[key] === obj2[key]) {
      result.push(`  ${key}: ${obj1[key]}`);
    }
  }
  for (const key of keys2) {
    if (!(key in obj1)) {
      result.push(`+ ${key}: ${obj2[key]}`);
    } else if (obj1[key] !== obj2[key]) {
      result.push(`+ ${key}: ${obj2[key]}`);
    }
  }

  const formattedResult = result.join('\n  ');
  return `{\n  ${formattedResult}\n}`;
  
};

// const compareKeys = (obj1, obj2) => {
//   const allKeys = _.union(Object.keys(obj1), Object.keys(obj2));
//   const sortedKeys = _.sortBy(allKeys);
//   const result = sortedKeys.map((key) => {
//     const value1 = obj1[key];
//     const value2 = obj2[key];

//     if (!_.has(obj1, key)) {
//       return { key, status: 'added', value: obj2[key] };
//     }
//     if (!_.has(obj2, key)) {
//       return { key, status: 'deleted', value: obj1[key] };
//     }
//     if (_.isObject(value1) && _.isObject(value2)) {
//       return { key, status: 'nested', children: compareKeys(value1, value2) };
//     }
//     if (value1 !== value2) {
//       const oldValue = obj1[key];
//       const newValue = obj2[key];
//       return {
//         key, status: 'changed', oldValue, newValue,
//       };
//     }
//     return { key, status: 'unchanged', value: obj1[key] };
//   });

//   return result;
// };





export default compareKeys;
