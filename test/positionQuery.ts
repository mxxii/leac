
import test, {ExecutionContext} from 'ava';

import { createPositionQuery } from '../src/positionQuery';

function snapshotMacro(t: ExecutionContext, str: string) {
  const query = createPositionQuery(str);
  const indices = Array.from({length: str.length + 4}, (v, k) => k - 2);
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
