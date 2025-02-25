[**leac v0.7.0-preview.1**](../index.md)

***

# Interface: ReplacementRule

Replacement rule - [RegexRule](RegexRule.md) that also applies a replacement in the output [Token](../type-aliases/Token.md) text.

## Extends

- [`RegexRule`](RegexRule.md)

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="discard"></a> `discard?`

</td>
<td>

`boolean`

</td>
<td>

Matched token won't be added to the output array if this set to `true`.

(_Think twice before using this._)

</td>
<td>

[`RegexRule`](RegexRule.md).[`discard`](RegexRule.md#discard)

</td>
</tr>
<tr>
<td>

<a id="name"></a> `name`

</td>
<td>

`string`

</td>
<td>

The name of the rule, also the name of tokens produced by this rule.

</td>
<td>

[`RegexRule`](RegexRule.md).[`name`](RegexRule.md#name)

</td>
</tr>
<tr>
<td>

<a id="pop"></a> `pop?`

</td>
<td>

`boolean`

</td>
<td>

Stop after this match and return.

If there is a parent lexer - it will continue from this point.

</td>
<td>

[`RegexRule`](RegexRule.md).[`pop`](RegexRule.md#pop)

</td>
</tr>
<tr>
<td>

<a id="push"></a> `push?`

</td>
<td>

[`Lexer`](../type-aliases/Lexer.md)

</td>
<td>

Switch to another lexer function after this match,
concatenate it's results and continue from where it stopped.

</td>
<td>

[`RegexRule`](RegexRule.md).[`push`](RegexRule.md#push)

</td>
</tr>
<tr>
<td>

<a id="regex"></a> `regex`

</td>
<td>

`RegExp`

</td>
<td>

Regular expression to match.

- Can't have the global flag.

- All regular expressions are used as sticky,
  you don't have to specify the sticky flag.

- Empty matches are considered as non-matches -
  no token will be emitted in that case.

</td>
<td>

[`RegexRule`](RegexRule.md).[`regex`](RegexRule.md#regex)

</td>
</tr>
<tr>
<td>

<a id="replace"></a> `replace`

</td>
<td>

`string`

</td>
<td>

Replacement string can include patterns,
the same as [String.prototype.replace()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_a_parameter).

This will only affect the text property of the output [Token](../type-aliases/Token.md), not it's offset or length.

Note: the regex has to be able to match the matched substring when taken out of context
in order for replace to work - boundary/neighborhood conditions may prevent this.

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>
