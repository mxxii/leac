
import test from 'ava';

import { createLexer } from '../src/leac.ts';


test('name should match', (t) => {
  const lex = createLexer([ { name: 'a' } ]);
  const result = lex('aab');
  t.snapshot(result, 'match "a", "a" by name "a" from "aab"');
});

test('str should match', (t) => {
  const lex = createLexer([ { name: 'a', str: 'b' } ]);
  const result = lex('bbb');
  t.snapshot(result, 'match "b", "b", "b" by str "b" from "bbb"');
});

test('strings should be escaped 1', (t) => {
  const lex = createLexer([ { name: 'a', str: '.' } ]);
  const result = lex('.:');
  t.snapshot(result, 'match "." by str "." from ".:"');
});

test('strings should be escaped 2', (t) => {
  const lex = createLexer([ { name: 'a', str: '\n' } ]);
  const result = lex('\n\\n');
  t.snapshot(result, 'match "\\n" by str "\\n" from "\\n\\\\n"');
});

test('regex should be made sticky', (t) => {
  const lex = createLexer([ { name: 'a', regex: /a/ } ]);
  const result = lex('baa');
  t.snapshot(result, 'not match "a" by /a/ from "baa"');
});

test('other regex flags should work', (t) => {
  const lex = createLexer([ { name: 'a', regex: /.a$/ims } ]);
  const result = lex('\nA\n');
  t.snapshot(result, 'match "\\nA" by /.a$/ims from "\\nA\\n"');
});

test('should replace matched groups', (t) => {
  const lex = createLexer([ {
    name: 'abc',
    regex: /(a)(b)(?<c>c)/,
    replace: '$<c>, $2, $1',
  } ]);
  const result = lex('abc');
  t.snapshot(result, 'match "abc" and replace with "c, b, a"');
});

test('discarded matches should not be present in the result', (t) => {
  const lex = createLexer([ { name: 'a', discard: true } ]);
  const result = lex('aaa');
  t.snapshot(result, 'empty match - all "a"s discarded from "aaa"');
});

test('empty input should produce complete empty result', (t) => {
  const lex = createLexer([ { name: 'a' } ]);
  const result = lex('');
  t.snapshot(result, 'empty match from empty input');
});

test('manual offset', (t) => {
  const lex = createLexer([ { name: 'a' } ]);
  const result = lex('bba', 2);
  t.snapshot(result, 'match "a" by name "a" from "bba" with offset 2');
});

test('manual offset outside the string boundaries', (t) => {
  const lex = createLexer([ { name: 'a', regex: /./ } ]);
  const result = lex('aaa', 4);
  t.snapshot(result, 'not match from "aaa" with offset 4');
});

test('zero length match is a nonmatch', (t) => {
  const lex = createLexer([ { name: 'a', regex: /a?/ } ]);
  const result = lex('a');
  t.snapshot(result, 'single "a" match by /a?/ from "a"');
});

test('line numbers', (t) => {
  const lex = createLexer(
    [ { name: 'a', regex: /./ }, { name: 'b', regex: /\n/ } ],
    { lineNumbers: true },
  );
  const result = lex('abc\n\ndef\n\n');
  t.snapshot(result, 'match all, "a", "b", "c" on line 1, "d", "e", "f" on line 3');
});

test('first match should be taken', (t) => {
  const lex = createLexer([
    { name: 'aa' },
    { name: 'a' },
    { name: 'aaa' },
  ]);
  const result = lex('aaa');
  t.snapshot(result, 'match "aa", "a" from "aaa"');
});

test('rules with the same name are allowed', (t) => {
  const lex = createLexer([
    { name: 'a-or-b', str: 'a' },
    { name: 'a-or-b', str: 'b' },
  ]);
  const result = lex('abab');
  t.snapshot(result, 'match "a", "b", "a", "b" from "abab"');
});
