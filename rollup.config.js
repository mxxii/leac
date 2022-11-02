import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default [
  {
    external: [],
    input: 'src/leac.ts',
    plugins: [typescript(), terser()],
    output: [
      {
        dir: 'lib',
        format: 'es',
        entryFileNames: '[name].mjs',
      },
      {
        dir: 'lib',
        format: 'cjs',
        entryFileNames: '[name].cjs',
      },
    ],
  },
];
