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

export default compareKeys;
