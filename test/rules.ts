
import test from 'ava';
import type { ExecutionContext } from 'ava';

import { toUnifiedRule } from '../src/rules.ts';
import type { Rule, StringRule, RegexRule, ReplacementRule } from '../src/types.ts';


function snapshotMacro (t: ExecutionContext, r: Rule) {
  const unifiedRule = toUnifiedRule(r, 0);
  t.snapshot(unifiedRule, stringifyWithRegex(r));
}

function stringifyWithRegex (r: Rule) {
  return JSON.stringify(
    'regex' in r && r.regex instanceof RegExp
      ? { ...r, regex: `/${r.regex.source}/${r.regex.flags}` }
      : r,
  );
}

test('basic rule', snapshotMacro, { name: 'a' } satisfies Rule);

test('basic rule, more properties', snapshotMacro, {
  name: 'a',
  discard: true,
  push: undefined,
  pop: false,
} satisfies Rule);

test('string rule', snapshotMacro, { name: 'a', str: 'b' } satisfies StringRule as Rule);

test('regex rule, non-sticky', snapshotMacro, { name: 'a', regex: /b/ } satisfies RegexRule as Rule);

test('regex rule, sticky', snapshotMacro, { name: 'a', regex: /b/y } satisfies RegexRule as Rule);

test('replacement rule, non-sticky', snapshotMacro, {
  name: 'a',
  regex: /b/,
  replace: 'c',
} satisfies ReplacementRule as Rule);

test('replacement rule, sticky', snapshotMacro, {
  name: 'a',
  regex: /b/y,
  replace: 'c',
} satisfies ReplacementRule as Rule);
