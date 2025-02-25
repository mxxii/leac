import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';

export default [
  {
    external: [],
    input: 'src/leac.ts',
    plugins: [typescript()],
    output: [
      {
        format: 'es',
        file: 'lib/leac.mjs',
      },
      {
        format: 'cjs',
        file: 'lib/leac.cjs',
      },
    ],
  },
  {
    input: 'src/leac.ts',
    plugins: [
      dts(),
      del({ targets: 'lib/*.d.ts', hook: 'writeBundle', verbose: true }),
    ],
    output: [
      {
        format: 'es',
        file: 'lib/leac.d.mts',
      },
      {
        format: 'cjs',
        file: 'lib/leac.d.cts',
      },
    ],
  },
];
