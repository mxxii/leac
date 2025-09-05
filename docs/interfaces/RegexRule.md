[**leac v0.7.0**](../index.md)

***

# Interface: RegexRule

Regex rule - looks for a regular expression match.

## Extends

- [`Rule`](Rule.md)

## Extended by

- [`ReplacementRule`](ReplacementRule.md)

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

[`Rule`](Rule.md).[`discard`](Rule.md#discard)

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

[`Rule`](Rule.md).[`name`](Rule.md#name)

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

[`Rule`](Rule.md).[`pop`](Rule.md#pop)

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

[`Rule`](Rule.md).[`push`](Rule.md#push)

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

&hyphen;

</td>
</tr>
</tbody>
</table>
