[**leac v0.7.0-preview.1**](../index.md)

***

# Type Alias: Lexer()

```ts
type Lexer = (str: string, offset?: number) => LexerResult;
```

Lexer function.

## Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`str`

</td>
<td>

`string`

</td>
<td>

A string to tokenize.

</td>
</tr>
<tr>
<td>

`offset`?

</td>
<td>

`number`

</td>
<td>

Initial offset. Used when composing lexers.

</td>
</tr>
</tbody>
</table>

## Returns

[`LexerResult`](LexerResult.md)
