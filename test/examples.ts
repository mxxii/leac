
import test, {ExecutionContext} from 'ava';

import { execFileSync } from 'child_process';

function snapshotMacro(t: ExecutionContext, examplePath: string) {
  const stdout = execFileSync('node', [
    '--experimental-specifier-resolution=node',
    '--loader',
    'ts-node/esm',
    examplePath
  ]);
  t.snapshot(stdout.toString(), examplePath);
}

test('calc', snapshotMacro, './examples/calc.ts');

test('json', snapshotMacro, './examples/json.ts');
