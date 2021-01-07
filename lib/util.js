/* eslint-disable */

import { inspect } from 'util'

/* backported from Node's lib/util */
/* https://github.com/nodejs/node/blob/v12.3.1/lib/internal/util/inspect.js */
/* 10b4a8103d5e8a081f9e6a6b8911d02c4e4e3dc1 */
export function formatWithOptions(inspectOptions, ...args) {
  const first = args[0];
  let a = 0;
  let str = '';
  let join = '';
  if (typeof first === 'string') {
    if (args.length === 1) {
      return first;
    }
    let tempStr;
    let lastPos = 0;
    for (var i = 0; i < first.length - 1; i++) {
      if (first.charCodeAt(i) === 37) { // '%'
        const nextChar = first.charCodeAt(++i);
        if (a + 1 !== args.length) {
          switch (nextChar) {
            case 115: // 's'
              const tempArg = args[++a];
              if (typeof tempArg === 'number') {
                tempStr = formatNumber(stylizeNoColor, tempArg);
              } else if (typeof tempArg === 'bigint') {
                tempStr = `${tempArg}n`;
              } else {
                let constr;
                if (typeof tempArg !== 'object' ||
                    tempArg === null ||
                    typeof tempArg.toString === 'function' &&
                     // A direct own property.
                     (hasOwnProperty(tempArg, 'toString') ||
                      // A direct own property on the constructor prototype in
                      // case the constructor is not an built-in object.
                      (constr = tempArg.constructor) &&
                      !builtInObjects.has(constr.name) &&
                      constr.prototype &&
                      hasOwnProperty(constr.prototype, 'toString'))) {
                  tempStr = String(tempArg);
                } else {
                  tempStr = inspect(tempArg, {
                    ...inspectOptions,
                    compact: 3,
                    colors: false,
                    depth: 0
                  });
                }
              }
              break;
            case 106: // 'j'
              tempStr = tryStringify(args[++a]);
              break;
            case 100: // 'd'
              const tempNum = args[++a];
              if (typeof tempNum === 'bigint') {
                tempStr = `${tempNum}n`;
              } else if (typeof tempNum === 'symbol') {
                tempStr = 'NaN';
              } else {
                tempStr = formatNumber(stylizeNoColor, Number(tempNum));
              }
              break;
            case 79: // 'O'
              tempStr = inspect(args[++a], inspectOptions);
              break;
            case 111: // 'o'
            {
              tempStr = inspect(args[++a], {
                ...inspectOptions,
                showHidden: true,
                showProxy: true,
                depth: 4
              });
              break;
            }
            case 105: // 'i'
              const tempInteger = args[++a];
              if (typeof tempInteger === 'bigint') {
                tempStr = `${tempInteger}n`;
              } else if (typeof tempInteger === 'symbol') {
                tempStr = 'NaN';
              } else {
                tempStr = formatNumber(stylizeNoColor, parseInt(tempInteger));
              }
              break;
            case 102: // 'f'
              const tempFloat = args[++a];
              if (typeof tempFloat === 'symbol') {
                tempStr = 'NaN';
              } else {
                tempStr = formatNumber(stylizeNoColor, parseFloat(tempFloat));
              }
              break;
            case 37: // '%'
              str += first.slice(lastPos, i);
              lastPos = i + 1;
              continue;
            default: // Any other character is not a correct placeholder
              continue;
          }
          if (lastPos !== i - 1) {
            str += first.slice(lastPos, i - 1);
          }
          str += tempStr;
          lastPos = i + 1;
        } else if (nextChar === 37) {
          str += first.slice(lastPos, i);
          lastPos = i + 1;
        }
      }
    }
    if (lastPos !== 0) {
      a++;
      join = ' ';
      if (lastPos < first.length) {
        str += first.slice(lastPos);
      }
    }
  }
  while (a < args.length) {
    const value = args[a];
    str += join;
    str += typeof value !== 'string' ? inspect(value, inspectOptions) : value;
    join = ' ';
    a++;
  }
  return str;
}

function formatNumber(fn, value) {
  // Format -0 as '-0'. Checking `value === -0` won't distinguish 0 from -0.
  return fn(Object.is(value, -0) ? '-0' : `${value}`, 'number');
}

function stylizeNoColor(str) {
  return str;
}
