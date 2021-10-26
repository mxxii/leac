# Interface: RegexRule

Regex rule - looks for a regular expression match.

## Hierarchy

- [`Rule`](Rule.md)

  ↳ **`RegexRule`**

## Table of contents

### Properties

- [discard](RegexRule.md#discard)
- [name](RegexRule.md#name)
- [pop](RegexRule.md#pop)
- [push](RegexRule.md#push)
- [regex](RegexRule.md#regex)
- [replace](RegexRule.md#replace)

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

### regex

• **regex**: `RegExp`

Regular expression to match.

Can't have the global flag.

All regular expressions are used as sticky,
you don't have to specify the sticky flag.

___

### replace

• `Optional` **replace**: `string`

Replacement string can include patterns,
the same as [String.prototype.replace()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_a_parameter).

This will only affect the text property of an output token, not it's offset or length.

Note: the regex has to be able to match the matched substring when taken out of context
in order for replace to work - boundary/neighbourhood conditions may prevent this.
