
import test from 'ava';
import type { ExecutionContext } from 'ava';

import { createPositionQuery } from '../src/positionQuery.ts';


function snapshotMacro (t: ExecutionContext, str: string) {
  const query = createPositionQuery(str);
  const indices = Array.from({ length: str.length + 4 }, (_v, k) => k - 2);
  const positions = indices
    .map((k) => {
      const p = query(k);
      return [k, str[k], p.line, p.column];
    });
  t.snapshot(positions, JSON.stringify(str));
}

test('empty string', snapshotMacro, '');

test('line feed', snapshotMacro, 'qwe\nrty');

test('carriage return, line feed', snapshotMacro, 'qwe\r\nrty');

test('line feeds', snapshotMacro, '\n\n\n');

test('query in reverse order', (t) => {
  const str = 'qwe\nrty';
  const query = createPositionQuery(str);
  const indices = Array.from({ length: str.length + 4 }, (_v, k) => k - 2);
  const positions = indices
    .reverse()
    .map((k) => {
      const p = query(k);
      return [k, str[k], p.line, p.column];
    });
  t.snapshot(positions, JSON.stringify(str));
});
