import { IsoBench } from 'iso-bench';

import { createLexer } from '../lib/leac.mjs';

const bench = new IsoBench();
bench
  .add(
    'without stacking',
    (lex) => { lex('aab[ccd]aba[cdc]baa'); },
    () => {
      const options = { lineNumbers: false };
      return createLexer([
        { name: 'a' },
        { name: 'b' },
        { name: 'c' },
        { name: 'd' },
        { name: '[' },
        { name: ']' },
      ], options);
    },
  )
  .add(
    'with stacking',
    (lex) => { lex('aab[ccd]aba[cdc]baa'); },
    () => {
      const options = { lineNumbers: false };
      return createLexer([
        { name: 'a' },
        { name: 'b' },
        { name: '[', push: createLexer([
          { name: 'c' },
          { name: 'd' },
          { name: ']', pop: true },
        ], options) },
      ], options);
    },
  )
  .endGroup('effect of stacking')
  .add(
    'without replacement',
    (lex) => { lex('aaabaaabaaabbaaabaaa'); },
    () => {
      const options = { lineNumbers: false };
      return createLexer([
        { name: 'a', regex: /a/ },
        { name: 'b', regex: /b/ },
      ], options);
    },
  )
  .add(
    'with replacement',
    (lex) => { lex('aaabaaabaaabbaaabaaa'); },
    () => {
      const options = { lineNumbers: false };
      return createLexer([
        {
          name: 'a', regex: /a/, replace: 'A',
        },
        {
          name: 'b', regex: /b/, replace: 'B',
        },
      ], options);
    },
  )
  .endGroup('effect of replacement')
  .add(
    'without line numbers',
    (lex) => { lex('aaa\n\naaa aaa\r\naaa aaa'); },
    () => {
      const options = { lineNumbers: false };
      return createLexer([
        { name: 'a' },
        { name: 'ws', regex: /\s+/ },
      ], options);
    },
  )
  .add(
    'with line numbers',
    (lex) => { lex('aaa\n\naaa aaa\r\naaa aaa'); },
    () => {
      const options = { lineNumbers: true };
      return createLexer([
        { name: 'a' },
        { name: 'ws', regex: /\s+/ },
      ], options);
    },
  )
  .endGroup('effect of line numbers')
  .add(
    'by names',
    (lex) => { lex('aaabaaabaaacbbaaabaaa'); },
    () => {
      const options = { lineNumbers: false };
      return createLexer([
        { name: 'a' },
        { name: 'b' },
        { name: 'c' },
      ], options);
    },
  )
  .add(
    'by strings',
    (lex) => { lex('aaabaaabaaacbbaaabaaa'); },
    () => {
      const options = { lineNumbers: false };
      return createLexer([
        { name: 'a', str: 'a' },
        { name: 'b', str: 'b' },
        { name: 'c', str: 'c' },
      ], options);
    },
  )
  .add(
    'by non-sticky regexes',
    (lex) => { lex('aaabaaabaaacbbaaabaaa'); },
    () => {
      const options = { lineNumbers: false };
      return createLexer([
        { name: 'a', regex: /a/ },
        { name: 'b', regex: /b/ },
        { name: 'c', regex: /c/ },
      ], options);
    },
  )
  .add(
    'by sticky regexes',
    (lex) => { lex('aaabaaabaaacbbaaabaaa'); },
    () => {
      const options = { lineNumbers: false };
      return createLexer([
        { name: 'a', regex: /a/y },
        { name: 'b', regex: /b/y },
        { name: 'c', regex: /c/y },
      ], options);
    },
  )
  .add(
    'by combined regex',
    (lex) => { lex('aaabaaabaaacbbaaabaaa'); },
    () => {
      const options = { lineNumbers: false };
      return createLexer([
        { name: 'abc', regex: /a|b|c/ },
      ], options);
    },
  )
  .endGroup('effect of rule type')
  .add(
    'from name',
    () => {
      const options = { lineNumbers: false };
      return createLexer([
        { name: 'a' },
        { name: 'b' },
        { name: 'c' },
      ], options);
    },
  )
  .add(
    'from string',
    () => {
      const options = { lineNumbers: false };
      return createLexer([
        { name: 'a', str: 'a' },
        { name: 'b', str: 'b' },
        { name: 'c', str: 'c' },
      ], options);
    },
  )
  .add(
    'from non-sticky regex',
    () => {
      const options = { lineNumbers: false };
      return createLexer([
        { name: 'a', regex: /a/ },
        { name: 'b', regex: /b/ },
        { name: 'c', regex: /c/ },
      ], options);
    },
  )
  .add(
    'from sticky regex',
    () => {
      const options = { lineNumbers: false };
      return createLexer([
        { name: 'a', regex: /a/y },
        { name: 'b', regex: /b/y },
        { name: 'c', regex: /c/y },
      ], options);
    },
  )
  .add(
    'from non-sticky regex with replace',
    () => {
      const options = { lineNumbers: false };
      return createLexer([
        {
          name: 'a', regex: /a/, replace: 'A',
        },
        {
          name: 'b', regex: /b/, replace: 'B',
        },
        {
          name: 'c', regex: /c/, replace: 'C',
        },
      ], options);
    },
  )
  .add(
    'from sticky regex with replace',
    () => {
      const options = { lineNumbers: false };
      return createLexer([
        {
          name: 'a', regex: /a/y, replace: 'A',
        },
        {
          name: 'b', regex: /b/y, replace: 'B',
        },
        {
          name: 'c', regex: /c/y, replace: 'C',
        },
      ], options);
    },
  )
  .endGroup('constructing, not running')
  .consoleLog()
  .run();
