import isObject from 'lodash/isObject';

type keyType = string | null;

function hasJsonStructure(str: keyType) {
  if (typeof str !== 'string') return false;
  try {
    const result = JSON.parse(str);
    const type = Object.prototype.toString.call(result);
    return type === '[object Object]' || type === '[object Array]';
  } catch (err) {
    return false;
  }
}

const localS = {
  get(key: string) {
    const found: keyType = localStorage.getItem(key);
    return hasJsonStructure(found) && found ? JSON.parse(found) : found;
  },
  set(key: string, value: any) {
    localStorage.setItem(key, isObject(value) ? JSON.stringify(value) : value);
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};

export default localS;
