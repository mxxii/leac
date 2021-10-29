
// Calculator that supports metric and binary unit prefixes.
// (Full calculator example comes with `peberminta` parser combinators package repo.)


import { inspect } from 'util';

import { createLexer } from '../src/leac';


const lex = createLexer([
  { name: '(' },
  { name: ')' },
  { name: ',' },
  { name: '^' },
  { name: '!' },
  { name: '-' },
  { name: '+' },
  { name: '*' },
  { name: '/' },
  { name: '%' },
  {
    name: 'ws',
    regex: /\s+/,
    discard: true
  },
  { name: 'number', regex: /(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?(?![0-9])/ },
  { name: 'unitPrefix', regex: /(?:[yzafpnumcdh]|da|[kMGTPEZY]i?)\b/ },
  { name: 'unaryFun', regex: /a?sin|a?cos|a?tan|ln|lg\b/ },
  { name: 'biFun', regex: /log\b/ },
  { name: 'constant', regex: /e|pi|tau\b/ },
]);


console.log(inspect(lex('(pi/2 + tau/2) / (e+2)')));


// Output

// {
//   tokens: [
//     {
//       state: '',
//       name: '(',
//       text: '(',
//       offset: 0,
//       len: 1,
//       line: 0,
//       column: 0
//     },
//     {
//       state: '',
//       name: 'constant',
//       text: 'pi',
//       offset: 1,
//       len: 2,
//       line: 0,
//       column: 0
//     },

//     ...

//     {
//       state: '',
//       name: ')',
//       text: ')',
//       offset: 21,
//       len: 1,
//       line: 0,
//       column: 0
//     }
//   ],
//   offset: 22,
//   complete: true
// }

// Complete output is in the test snapshot.
