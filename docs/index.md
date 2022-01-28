# leac - v0.5.0

## Table of contents

### Interfaces

- [RegexRule](interfaces/RegexRule.md)
- [Rule](interfaces/Rule.md)
- [StringRule](interfaces/StringRule.md)

### Type aliases

- [Lexer](index.md#lexer)
- [LexerResult](index.md#lexerresult)
- [Options](index.md#options)
- [Rules](index.md#rules)
- [Token](index.md#token)

### Functions

- [createLexer](index.md#createlexer)

## Type aliases

### Lexer

Ƭ **Lexer**: (`str`: `string`, `offset?`: `number`) => [`LexerResult`](index.md#lexerresult)

#### Type declaration

▸ (`str`, `offset?`): [`LexerResult`](index.md#lexerresult)

Lexer function.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | A string to tokenize. |
| `offset?` | `number` | Initial offset. Used when composing lexers. |

##### Returns

[`LexerResult`](index.md#lexerresult)

___

### LexerResult

Ƭ **LexerResult**: `Object`

Result returned by a lexer function.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `complete` | `boolean` | True if whole input string was processed.  Check this to see whether some input left untokenized. |
| `offset` | `number` | Final offset. |
| `tokens` | [`Token`](index.md#token)[] | Array of tokens. |

___

### Options

Ƭ **Options**: `Object`

Lexer options (not many so far).

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `lineNumbers?` | `boolean` | Enable line and column numbers computation. |

___

### Rules

Ƭ **Rules**: [[`Rule`](interfaces/Rule.md) \| [`StringRule`](interfaces/StringRule.md) \| [`RegexRule`](interfaces/RegexRule.md), ...(Rule \| StringRule \| RegexRule)[]]

Non-empty array of rules.

Rules are processed in provided order, first match is taken.

Rules can have the same name. For example, you can have
separate rules for various keywords and use the same name "keyword".

___

### Token

Ƭ **Token**: `Object`

Token object, a result of matching an individual lexing rule.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `column` | `number` | Column number within the line in the source string (1-based).  _(Always zero if line numbers not enabled in the lexer options.)_ |
| `len` | `number` | The length of the matched substring.  _(Might be different from the text length in case replace value was used in a RegexRule.)_ |
| `line` | `number` | Line number in the source string (1-based).  _(Always zero if not enabled in the lexer options.)_ |
| `name` | `string` | Name of the rule produced this token. |
| `offset` | `number` | Start index of the match in the input string. |
| `state` | `string` | Name of the lexer containing the rule produced this token. |
| `text` | `string` | Text matched by the rule. _(Unless a replace value was used by a RegexRule.)_ |

## Functions

### createLexer

▸ **createLexer**(`rules`, `state?`, `options?`): [`Lexer`](index.md#lexer)

Create a lexer function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rules` | [`Rules`](index.md#rules) | Non-empty array of lexing rules.  Rules are processed in provided order, first match is taken.  Rules can have the same name - you can have separate rules for keywords and use the same name "keyword" for example. |
| `state?` | `string` | The name of this lexer. Use when composing lexers. Empty string by default. |
| `options?` | [`Options`](index.md#options) | Lexer options object. |

#### Returns

[`Lexer`](index.md#lexer)

▸ **createLexer**(`rules`, `options?`): [`Lexer`](index.md#lexer)

Create a lexer function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rules` | [`Rules`](index.md#rules) | Non-empty array of lexing rules.  Rules are processed in provided order, first match is taken.  Rules can have the same name - you can have separate rules for keywords and use the same name "keyword" for example. |
| `options?` | [`Options`](index.md#options) | Lexer options object. |

#### Returns

[`Lexer`](index.md#lexer)
