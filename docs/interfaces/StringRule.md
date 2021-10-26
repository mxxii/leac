# Interface: StringRule

String rule - looks for exact string match that
can be different from the name of the rule.

## Hierarchy

- [`Rule`](Rule.md)

  ↳ **`StringRule`**

## Table of contents

### Properties

- [discard](StringRule.md#discard)
- [name](StringRule.md#name)
- [pop](StringRule.md#pop)
- [push](StringRule.md#push)
- [str](StringRule.md#str)

## Properties

### discard

• `Optional` **discard**: `boolean`

Matched token won't be added to the output array if this set to `true`.

#### Inherited from

[Rule](Rule.md).[discard](Rule.md#discard)

___

### name

• **name**: `string`

The name of the rule, also the name of tokens produced by this rule.

#### Inherited from

[Rule](Rule.md).[name](Rule.md#name)

___

### pop

• `Optional` **pop**: `boolean`

Stop after this match and return.

If there is a parent parser - it will continue from this point.

#### Inherited from

[Rule](Rule.md).[pop](Rule.md#pop)

___

### push

• `Optional` **push**: [`Lexer`](../index.md#lexer)

Switch to another lexer function after this match,
concat it's results and continue from where it stopped.

#### Inherited from

[Rule](Rule.md).[push](Rule.md#push)

___

### str

• **str**: `string`

Specify the exact string to match
if it is different from the name of the rule.
