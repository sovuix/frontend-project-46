// const parsers = {
//   json: JSON.parse,
// };

// const parse = (data, format) => parsers[format](data);
import yaml from 'js-yaml';

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.load(data);
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error('Unknown file extension!');
  }
}



export default parse;
// export default parse;
