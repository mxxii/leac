**leac v0.7.0-preview.1**

***

# leac v0.7.0-preview.1

## Interfaces

| Interface | Description |
| ------ | ------ |
| [RegexRule](interfaces/RegexRule.md) | Regex rule - looks for a regular expression match. |
| [ReplacementRule](interfaces/ReplacementRule.md) | Replacement rule - [RegexRule](interfaces/RegexRule.md) that also applies a replacement in the output [Token](type-aliases/Token.md) text. |
| [Rule](interfaces/Rule.md) | Lexing rule. |
| [StringRule](interfaces/StringRule.md) | String rule - looks for exact string match that can be different from the name of the rule. |

## Type Aliases

| Type alias | Description |
| ------ | ------ |
| [Lexer](type-aliases/Lexer.md) | Lexer function. |
| [LexerResult](type-aliases/LexerResult.md) | Result returned by a [Lexer](type-aliases/Lexer.md). |
| [Options](type-aliases/Options.md) | Options for a [Lexer](type-aliases/Lexer.md) (not many so far). |
| [Rules](type-aliases/Rules.md) | Non-empty array of [Rule](interfaces/Rule.md)s. |
| [Token](type-aliases/Token.md) | Token object, the result of matching an individual lexing rule. |

## Functions

| Function | Description |
| ------ | ------ |
| [createLexer](functions/createLexer.md) | Create a lexer function. |
