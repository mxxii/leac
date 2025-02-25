[**leac v0.7.0-preview.1**](../index.md)

***

# Type Alias: Token

```ts
type Token = object;
```

Token object, the result of matching an individual lexing rule.

## Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="column"></a> `column`

</td>
<td>

`number`

</td>
<td>

Column number within the line in the source string (1-based).

_(Always zero if line numbers not enabled in [Options](Options.md).)_

</td>
</tr>
<tr>
<td>

<a id="len"></a> `len`

</td>
<td>

`number`

</td>
<td>

The length of the matched substring.

_(Might be different from the text length in case of [ReplacementRule](../interfaces/ReplacementRule.md).)_

</td>
</tr>
<tr>
<td>

<a id="line"></a> `line`

</td>
<td>

`number`

</td>
<td>

Line number in the source string (1-based).

_(Always zero if line numbers not enabled in [Options](Options.md).)_

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

Name of the [Rule](../interfaces/Rule.md) produced this token.

</td>
</tr>
<tr>
<td>

<a id="offset"></a> `offset`

</td>
<td>

`number`

</td>
<td>

Start index of the match in the input string.

</td>
</tr>
<tr>
<td>

<a id="state"></a> `state`

</td>
<td>

`string`

</td>
<td>

Name of the [Lexer](Lexer.md) containing the rule produced this token.

</td>
</tr>
<tr>
<td>

<a id="text"></a> `text`

</td>
<td>

`string`

</td>
<td>

Text matched by the rule. _(Except for [ReplacementRule](../interfaces/ReplacementRule.md) that can alter this.)_

</td>
</tr>
</tbody>
</table>
