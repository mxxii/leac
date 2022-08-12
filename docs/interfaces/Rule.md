# Interface: Rule

Lexing rule.

Base rule looks for exact match by it's name.

If the name and the lookup string have to be different
then specify `str` property as defined in [StringRule](StringRule.md).

## Hierarchy

- **`Rule`**

  ↳ [`StringRule`](StringRule.md)

  ↳ [`RegexRule`](RegexRule.md)

## Table of contents

### Properties

- [discard](Rule.md#discard)
- [name](Rule.md#name)
- [pop](Rule.md#pop)
- [push](Rule.md#push)

## Properties

### discard

• `Optional` **discard**: `boolean`

Matched token won't be added to the output array if this set to `true`.

(_Think twice before using this._)

___

### name

• **name**: `string`

The name of the rule, also the name of tokens produced by this rule.

___

### pop

• `Optional` **pop**: `boolean`

Stop after this match and return.

If there is a parent parser - it will continue from this point.

___

### push

• `Optional` **push**: [`Lexer`](../index.md#lexer)

Switch to another lexer function after this match,
concatenate it's results and continue from where it stopped.
