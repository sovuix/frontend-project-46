const compareKeys = (obj1, obj2) => {
  const keys1 = _.sortBy(Object.keys(obj1));
  const keys2 = _.sortBy(Object.keys(obj2));

  const result = [
    ...keys1
      .filter((key) => !(key in obj2))
      .map((key) => `- ${key}: ${obj1[key]}`),

    ...keys1
      .filter((key) => key in obj2 && obj1[key] !== obj2[key])
      .map((key) => `- ${key}: ${obj1[key]}`),

    ...keys1
      .filter((key) => key in obj2 && obj1[key] === obj2[key])
      .map((key) => `  ${key}: ${obj1[key]}`),

    ...keys2
      .filter((key) => !(key in obj1))
      .map((key) => `+ ${key}: ${obj2[key]}`),

    ...keys2
      .filter((key) => key in obj1 && obj1[key] !== obj2[key])
      .map((key) => `+ ${key}: ${obj2[key]}`),
  ];

  const formattedResult = result.join('\n  ');
  return `{\n  ${formattedResult}\n}`;
};

export default compareKeys;
