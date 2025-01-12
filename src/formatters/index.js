import plain from './plain.js';
import stylish from './stylish.js';

const format = (ast, formatName) => {
    switch(formatName) {
      case 'json':
        return JSON.stringify(ast, null, 2);
      case 'stylish':
        return stylish(ast);
      case 'plain': 
        return plain(ast); 
    }
  }

  export default format;