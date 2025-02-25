[**leac v0.7.0-preview.1**](../index.md)

***

# Type Alias: LexerResult

```ts
type LexerResult = object;
```

Result returned by a [Lexer](Lexer.md).

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

<a id="complete"></a> `complete`

</td>
<td>

`boolean`

</td>
<td>

True if whole input string was processed.

Check this to see whether some input left untokenized.

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

Final offset.

</td>
</tr>
<tr>
<td>

<a id="tokens"></a> `tokens`

</td>
<td>

[`Token`](Token.md)[]

</td>
<td>

Array of tokens.

</td>
</tr>
</tbody>
</table>
