
import test from 'ava';

import { createLexer } from '../src/leac';


test('empty name should throw', (t) => {
  t.throws(
    () => createLexer([ { name: '' } ]),
    { message: 'Rule #0 has empty name, which is not allowed.' }
  );
});

test('empty name should throw even when not used for matching', (t) => {
  t.throws(
    () => createLexer([ { name: '', regex: /a/ } ]),
    { message: 'Rule #0 has empty name, which is not allowed.' }
  );
});

test('empty str should throw', (t) => {
  t.throws(
    () => createLexer([ { name: 'a', str: '' } ]),
    { message: 'Rule #0 ("a") has empty "str" property, which is not allowed.' }
  );
});

test('global RegExp should throw', (t) => {
  t.throws(
    () => createLexer([ { name: 'a', regex: /a/g } ]),
    { message: 'Regular expression /a/g contains the global flag, which is not allowed.' }
  );
});
