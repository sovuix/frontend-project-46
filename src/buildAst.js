// import { isObject } from "lodash";
import _ from 'lodash';

const buildAst = (obj1, obj2) => {
  const iter = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const uniqueKeys = Array.from(new Set([...keys1, ...keys2])).sort();
    
    const res = uniqueKeys.map(key => {
      if(!(key in obj1)) {
        return {type: 'added', key, value: obj2[key]}
      };

      if(!(key in obj2)) {
        return {type: 'deleted', key, value: obj2[key]}
      };

      if(_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return {
          type: 'nested', 
          children: iter(obj1[key], obj2[key])
        };
      };

      if(obj1[key] !== obj2[key]){
        return {type: 'changed', key, oldValue: obj1[key], newValue: obj2[key]} 
      };

      return {type: 'notModified', key, value: obj1[key]}
    });

    return res;
  }

  return {
    type: 'root',
    children: iter(obj1, obj2),
  }
}

export default buildAst;

