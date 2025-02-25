# Changelog

## Version 0.7.0-preview.1

The purpose of the preview is to resolve the package compatibility issues and provide a more compatible version for those who need it, while the new version of the companion package, [peberminta](https://github.com/mxxii/peberminta), is still in development. I don't expect new feature changes in the release version.

- Targeting Node 18, tested only on Node 20
  - it is increasingly difficult to keep all the dev dependencies behind near the end of Node 18 LTS cycle (2025-04-30) just to test it
  - full release will almost certainly happen after Node 18 EOL;
- Performance improvements, now with internal benchmarks;
- `ReplacementRule` is extracted from `RegexRule` as a separate interface;
- Adjustment of `package.json` exports;
- Few more unit tests and coverage report;
- Documentation updates;
- NPM package code is not tersed anymore.

## Version 0.6.0

- Targeting Node.js version 14 and ES2020;
- Now should be discoverable with [denoify](https://github.com/garronej/denoify).

## Version 0.5.1

- Documentation updates.

## Version 0.5.0

- Initial release;
- Aiming at Node.js version 12 and up.
