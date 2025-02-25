[**leac v0.7.0-preview.1**](../index.md)

***

# Interface: Rule

Lexing rule.

Base rule looks for exact match by it's name.

If the name and the lookup string have to be different
then specify `str` property as defined in [StringRule](StringRule.md).

## Extended by

- [`StringRule`](StringRule.md)
- [`RegexRule`](RegexRule.md)

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
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
</tr>
</tbody>
</table>
