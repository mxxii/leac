
import test from 'ava';

import { createLexer } from '../src/leac';


test('empty name should throw', (t) => {
  const err = t.throws(() => createLexer([ { name: '' } ]));
  t.is(err.message, 'Rule #0 has empty name, which is not allowed.');
});

test('empty name should throw even when not used for matching', (t) => {
  const err = t.throws(() => createLexer([ { name: '', regex: /a/ } ]));
  t.is(err.message, 'Rule #0 has empty name, which is not allowed.');
});

test('empty str should throw', (t) => {
  const err = t.throws(() => createLexer([ { name: 'a', str: '' } ]));
  t.is(err.message, 'Rule #0 ("a") has empty "str" property, which is not allowed.');
});

test('global RegExp should throw', (t) => {
  const err = t.throws(() => createLexer([ { name: 'a', regex: /a/g } ]));
  t.is(
    err.message,
    'Regular expression /a/g contains the global flag, which is not allowed.'
  );
});
