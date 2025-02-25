
import test from 'ava';
import type { ExecutionContext } from 'ava';

import { execFileSync } from 'child_process';

export default { require: ['./_force-exit.mjs'] };


function snapshotMacro (t: ExecutionContext, examplePath: string) {
  const stdout = execFileSync('node', [
    '--import=ts-blank-space/register',
    examplePath,
  ]);
  t.snapshot(stdout.toString(), examplePath);
}

test('calc', snapshotMacro, './examples/calc.ts');

test('json', snapshotMacro, './examples/json.ts');
