
// https://www.json.org/json-en.html

// Introducing a separate lexer for string contents
// is rather contrived. It is here to demonstrate
// how to compose lexers and get quotes as separate tokens if needed.

// Another option might be to use a capture group
// and replace the token contents but that would mean
// the token array can no longer be directly serialized
// without processing (adding quotes back to string tokens).

// Full JSON parser example comes with `peberminta` parser combinators package repo.
// There, I just left quotes as a part of a single token for the parser to handle.


import { inspect } from 'util';

import { createLexer, Options } from '../src/leac';


const options: Options = { lineNumbers: true };

const lexJson = createLexer([
  { name: '{' },
  { name: '}' },
  { name: '[' },
  { name: ']' },
  { name: ',' },
  { name: ':' },
  { name: 'null' },
  { name: 'true' },
  { name: 'false' },
  {
    name: 'space',
    regex: /\s+/,
    discard: true
  },
  { name: 'number', regex: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/ },
  {
    name: 'openQuote',
    str: '"',
    push: createLexer([
      // Following regex can match an empty string and no token will be emitted in that case -
      // empty matches are considered as non-matches.
      // Keep this in mind if you're thinking about discarding quotes.
      { name: 'string', regex: /(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*/ },
      {
        name: 'closeQuote',
        str: '"',
        pop: true
      }
    ], 'string', options)
  }
], 'root', options);


console.log(inspect(lexJson(`
{
  "foo": true, "bar": "baz",
  "qux": [1, 2, [3], [ ], { "quux": "quuz" }]
}
`)));


// Output

// {
//   tokens: [
//     {
//       state: 'root',
//       name: '{',
//       text: '{',
//       offset: 1,
//       len: 1,
//       line: 2,
//       column: 1
//     },
//     {
//       state: 'root',
//       name: 'openQuote',
//       text: '"',
//       offset: 5,
//       len: 1,
//       line: 3,
//       column: 3
//     },
//     {
//       state: 'string',
//       name: 'string',
//       text: 'foo',
//       offset: 6,
//       len: 3,
//       line: 3,
//       column: 4
//     },
//     {
//       state: 'string',
//       name: 'closeQuote',
//       text: '"',
//       offset: 9,
//       len: 1,
//       line: 3,
//       column: 7
//     },
//     {
//       state: 'root',
//       name: ':',
//       text: ':',
//       offset: 10,
//       len: 1,
//       line: 3,
//       column: 8
//     },

//     ...

//     {
//       state: 'root',
//       name: '}',
//       text: '}',
//       offset: 78,
//       len: 1,
//       line: 5,
//       column: 1
//     }
//   ],
//   offset: 80,
//   complete: true
// }

// Complete output is in the test snapshot.
