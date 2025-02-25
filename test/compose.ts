
import test from 'ava';

import { createLexer } from '../src/leac.ts';


test('state name', (t) => {
  const lex = createLexer([ { name: 'a' } ], 'A');
  const result = lex('a');
  t.snapshot(result, 'single "a" match with the state name "A"');
});

test('continue from where inner lexer had no matches', (t) => {
  const lex = createLexer([
    { name: 'a' },
    { name: 'b', push: createLexer([ { name: 'c' } ], 'B') },
    { name: 'd' },
  ], 'A');
  const result = lex('abbccd');
  t.snapshot(result, 'match all from "abbccd"');
});

test('pop from inner lexer', (t) => {
  const lex = createLexer([
    { name: 'a' },
    { name: 'b', push: createLexer([ { name: 'c', pop: true } ], 'B') },
    { name: 'c' },
    { name: 'd' },
  ], 'A');
  const result = lex('abbccd');
  t.snapshot(result, 'match all from "abbccd", "c"s with different states');
});

test('pop from and after inner lexer', (t) => {
  const lex = createLexer([
    { name: 'a' },
    {
      name: 'b',
      push: createLexer([ { name: 'c', pop: true } ], 'B'),
      pop: true,
    },
    { name: 'c' },
    { name: 'd' },
  ], 'A');
  const result = lex('abccd');
  t.snapshot(result, 'match "a", "b", "c" from "abccd" and stop');
});
