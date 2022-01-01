# leac

![lint status badge](https://github.com/mxxii/leac/workflows/lint/badge.svg)
![test status badge](https://github.com/mxxii/leac/workflows/test/badge.svg)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/mxxii/leac/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/leac?logo=npm)](https://www.npmjs.com/package/leac)
[![deno](https://img.shields.io/badge/deno.land%2Fx%2F-leac-informational?logo=deno)](https://deno.land/x/leac)

Lexer / tokenizer.


## Features

- **Lightweight**. Zero dependencies. Not a lot of code.

- **Well tested** - comes will tests for everything including examples.

- **Compact syntax** - less boilerplate. Rule name is enough when it is the same as the lookup string.

- **No failures** - it just stops when there are no matching rules and returns the information about whether it completed and where it stopped in addition to tokens array.

- **Composable lexers** - instead of states within a lexer.

- **Stateless lexers** - all inputs are passed as arguments, all outputs are returned in a result object.

- **No streaming** - accepts a string at a time.

- **Only text tokens, no arbitrary values**. It seems to be a good habit to have tokens that are *trivially* serializable back into valid input string. Don't do the parser's job. There are a couple of convenience features such as the ability to discard matches or string replacements for regular expression rules but that has to be used mindfully.


## Install

### Node

```shell
> npm i leac
> yarn add leac
```

```ts
import { createLexer, Token } from 'leac';
```

### Deno

```ts
import { createLexer, Token } from 'https://deno.land/x/leac@.../leac.ts';
```


## Examples

- [JSON](https://github.com/mxxii/leac/blob/main/examples/json.ts) ([output snapshot](https://github.com/mxxii/leac/blob/main/test/snapshots/examples.ts.md#json));
- [Calc](https://github.com/mxxii/leac/blob/main/examples/calc.ts) ([output snapshot](https://github.com/mxxii/leac/blob/main/test/snapshots/examples.ts.md#calc)).

```typescript
const lex = createLexer([
  { name: '-', str: '-' },
  { name: '+' },
  { name: 'ws', regex: /\s+/, discard: true },
  { name: 'number', regex: /[0-9]|[1-9][0-9]+/ },
]);

const { tokens, offset, complete } = lex('2 + 2');
```


## API

- [docs/index.md](https://github.com/mxxii/leac/blob/main/docs/index.md)


## What about ...?

- performance - The code is very simple but I won't put any unverified assumptions here. I'd be grateful to anyone who can provide a good benchmark project to compare different lexers.

- stable release - Current release is well thought out and tested. I leave a chance that some changes might be needed based on feedback. Before version 1.0.0 this will be done without a deprecation cycle.


## Some other lexer / tokenizer packages

- [moo](https://github.com/no-context/moo);
- [doken](https://github.com/yishn/doken);
- [tokenizr](https://github.com/rse/tokenizr);
- [flex-js](https://github.com/sormy/flex-js);
- *and more, with varied level of maintenance.*
