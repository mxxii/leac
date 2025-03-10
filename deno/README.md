# leac

![lint status badge](https://github.com/mxxii/leac/workflows/lint/badge.svg)
![test status badge](https://github.com/mxxii/leac/workflows/test/badge.svg)
![test coverage badge](https://img.shields.io/nycrc/mxxii/leac?config=.c8rc.json)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/mxxii/leac/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/leac?logo=npm)](https://www.npmjs.com/package/leac)
[![npm](https://img.shields.io/npm/dw/leac?color=informational&logo=npm)](https://www.npmjs.com/package/leac)
[![deno](https://img.shields.io/badge/deno.land%2Fx%2F-leac-informational?logo=deno)](https://deno.land/x/leac)

Lexer / tokenizer.


## Features

- **Lightweight**. Zero dependencies. Not a lot of code.

- **Well tested** - comes will tests for everything including examples.

- **Compact syntax** - less boilerplate. Rule name is enough when it is the same as the lookup string.

- **No failures** - it just stops when there are no matching rules and returns the information about whether it completed and where it stopped in addition to tokens array.

- **Composable lexers** - instead of states within a lexer.

- **Stateless lexers** - all inputs are passed as arguments, all outputs are returned in a result object.

- **No streaming** - accepts a string at a time (more on this below).

- **Only text tokens, no arbitrary values**. It seems to be a good habit to have tokens that are *trivially* serializable back into a valid input string. Don't do the parser's job. There are a couple of convenience features such as the ability to discard matches or string replacements for regular expression rules but that has to be used mindfully (more on this below).

- Pairs well with [peberminta](https://github.com/mxxii/peberminta) – parser combinators toolkit.


## Changelog

Available here: [CHANGELOG.md](https://github.com/mxxii/leac/blob/main/CHANGELOG.md)


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

```typescript
const lex = createLexer([
  { name: '-', str: '-' },
  { name: '+' },
  { name: 'ws', regex: /\s+/, discard: true },
  { name: 'number', regex: /[0-9]|[1-9][0-9]+/ },
]);

const { tokens, offset, complete } = lex('2 + 2');
```

- [JSON](https://github.com/mxxii/leac/blob/main/examples/json.ts) ([output snapshot](https://github.com/mxxii/leac/blob/main/test/snapshots/examples.ts.md#json));
- [Calc](https://github.com/mxxii/leac/blob/main/examples/calc.ts) ([output snapshot](https://github.com/mxxii/leac/blob/main/test/snapshots/examples.ts.md#calc));
- [User-provided examples](https://github.com/mxxii/leac/issues?q=label%3Aexample);
- *feel free to post or PR interesting compact grammar examples.*

### Published packages using `leac`

- [parseley](https://github.com/mxxii/parseley) - CSS selectors parser


## API

- [v0.7.0-preview.1](https://github.com/mxxii/leac/blob/main/docs/index.md)
- [v0.6.0](https://github.com/mxxii/leac/blob/v0.6.0/docs/index.md)


## Lexer design notes


### Tokens are atoms

Don't try to pack as much as possible into a token. If you can identify actually atomic, indivisible parts of the grammar - it will be easier to work with them in the parser.

If you're

- defining a very long regular expression in a token,
- defining multiple tokens that have a notable common part,
- breaking down a token into parts in the parser

then your tokens might be too big.


### On rewriting tokens

It is often really tempting to rewrite a token on the go. But it can be dangerous unless you are absolutely mindful of all edge cases.

For example, who needs to carry string quotes around, right? Parser will only need the string content...

We'll have to consider following things:

- Regular expressions. Sometimes we want to match strings that can have a length *from zero* and up.

- Tokens are not produced without changing the offset. If something is missing - there is no token.

  If we allow a token with zero length - it will cause an infinite loop, as the same rule will be matched at the same offset, again and again.

- Discardable tokens - a convenience feature that may seem harmless at a first glance.

When put together, these things plus some intuition traps can lead to a broken array of tokens.

Strings can be empty, which means the token can be absent. With no content and no quotes the tokens array will most likely make no sense for a parser.

How to avoid potential issues:

- Don't discard anything that you may need to insert back if you try to immediately serialize the tokens array to string. This means whitespace are usually safe to discard while string quotes are not (what can be considered safe will heavily depend on the grammar - you may have a language with significant spaces and insignificant quotes...);

- You can introduce a higher priority rule to capture an empty string (opening quote immediately followed by closing quote) and emit a special token for that. This way empty string between quotes can't occur down the line;

- Match the whole string (content and quotes) with a single regular expression, let the parser deal with it. This can actually lead to a cleaner design than trying to be clever and removing "unnecessary" parts early;

- Match the whole string (content and quotes) with a single regular expression, use capture groups and [replace](https://github.com/mxxii/leac/blob/main/docs/interfaces/ReplacementRule.md#properties) property. This can produce a non-zero length token with empty text.

Another note about quotes: If the grammar allows for different quotes and you're still willing to get rid of them early - think how you're going to unescape the string later. Make sure you carry the information about the exact string kind in the token name at least - you will need it later.


## Performance

Internal benchmarks are [available](https://github.com/mxxii/leac/tree/main/benchmarks).


```
> tsimp ./benchmarks/benchmark.ts

[ISOBENCH ENDED] IsoBench
[GROUP ENDED] effect of stacking
without stacking                   - 432 177 op/s. 50 samples in 5343 ms. 1.000x (WORST)
with stacking                      - 517 294 op/s. 50 samples in 5294 ms. 1.197x (BEST)
[GROUP ENDED] effect of replacement
without replacement                - 652 823 op/s. 50 samples in 5366 ms. 1.993x (BEST)
with replacement                   - 327 504 op/s. 50 samples in 5311 ms. 1.000x (WORST)
[GROUP ENDED] effect of line numbers
without line numbers               - 687 916 op/s. 50 samples in 5299 ms. 1.885x (BEST)
with line numbers                  - 364 998 op/s. 50 samples in 5343 ms. 1.000x (WORST)
[GROUP ENDED] effect of rule type
by names                           - 610 921 op/s. 50 samples in 5304 ms. 1.047x
by strings                         - 595 716 op/s. 50 samples in 5431 ms. 1.021x
by non-sticky regexes              - 583 369 op/s. 50 samples in 5344 ms. 1.000x (WORST)
by sticky regexes                  - 601 227 op/s. 50 samples in 5321 ms. 1.031x
by combined regex                  - 719 475 op/s. 50 samples in 5348 ms. 1.233x (BEST)
[GROUP ENDED] constructing, not running
from name                          - 697 850 op/s. 50 samples in 5297 ms. 1.022x
from string                        - 683 054 op/s. 50 samples in 5276 ms. 1.000x (WORST)
from non-sticky regex              - 1 390 579 op/s. 50 samples in 5252 ms. 2.036x
from sticky regex                  - 5 697 033 op/s. 50 samples in 5265 ms. 8.341x (BEST)
from non-sticky regex with replace - 1 311 587 op/s. 50 samples in 5350 ms. 1.920x
from sticky regex with replace     - 926 344 op/s. 50 samples in 5261 ms. 1.356x
```

Trivial observations:

- stacking lexers reduces the number of rules in each lexer and speeds things up a bit;
- replacement and line numbers have runtime costs;
- all rule types perform the same on the same trivial matches (converted to the same representation internally);
  - combining same name rules in one regular expression rule can give slight performance boost by the cost of readability;
- constructing from sticky regular expressions (with `y` flag) is the cheapest, as long as you don't need replacement feature;
  - lexers aren't something you'd be constructing in volumes that make this matter, so this is a curiosity, it shouldn't be prioritized over code readability;

I have no benchmark comparing with other lexers/tokenizers. I'd be grateful to anyone who can provide a good benchmark project to compare different lexers on similar tasks.

Shoutout to <https://github.com/Llorx/iso-bench>.


## What about ...?

- stable release - Current release is well thought out and tested. I leave a chance that some changes might be needed based on feedback. Before version 1.0.0 this will be done without a deprecation cycle.

- streaming - I have no use case for it - majority of practical scenarios have reasonable input size and there is no need to pay with the complexity. I may think about it again once I see a good use case.


## Some other lexer / tokenizer packages

- [moo](https://github.com/no-context/moo);
- [doken](https://github.com/yishn/doken);
- [tokenizr](https://github.com/rse/tokenizr);
- [flex-js](https://github.com/sormy/flex-js);
- *and more, with varied level of maintenance.*
