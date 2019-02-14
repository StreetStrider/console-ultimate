/* eslint-disable */

import { inspect } from 'util'

/* backported from Node's lib/util */
/* e7f499681b98edc87deed3572a74f0c81bcfee1f */
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
              tempStr = String(args[++a]);
              break;
            case 106: // 'j'
              tempStr = tryStringify(args[++a]);
              break;
            case 100: // 'd'
              const tempNum = args[++a];
              // eslint-disable-next-line valid-typeof
              if (typeof tempNum === 'bigint') {
                tempStr = `${tempNum}n`;
              } else if (typeof tempNum === 'symbol') {
                tempStr = 'NaN';
              } else {
                tempStr = `${Number(tempNum)}`;
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
              // eslint-disable-next-line valid-typeof
              if (typeof tempInteger === 'bigint') {
                tempStr = `${tempInteger}n`;
              } else if (typeof tempInteger === 'symbol') {
                tempStr = 'NaN';
              } else {
                tempStr = `${parseInt(tempInteger)}`;
              }
              break;
            case 102: // 'f'
              const tempFloat = args[++a];
              if (typeof tempFloat === 'symbol') {
                tempStr = 'NaN';
              } else {
                tempStr = `${parseFloat(tempFloat)}`;
              }
              break;
            case 37: // '%'
              str += first.slice(lastPos, i);
              lastPos = i + 1;
              continue;
            default: // any other character is not a correct placeholder
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
