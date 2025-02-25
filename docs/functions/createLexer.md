[**leac v0.7.0-preview.1**](../index.md)

***

# Function: createLexer()

## Call Signature

```ts
function createLexer(
   rules: Rules, 
   state?: string, 
   options?: Options): Lexer
```

Create a lexer function.

### Parameters

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

`rules`

</td>
<td>

[`Rules`](../type-aliases/Rules.md)

</td>
<td>

Non-empty array of lexing rules.

Rules are processed in provided order, first match is taken.

Rules can have the same name - you can have separate rules
for keywords and use the same name "keyword" for example.

</td>
</tr>
<tr>
<td>

`state`?

</td>
<td>

`string`

</td>
<td>

The name of this lexer. Use when composing lexers.
Empty string by default.

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

[`Options`](../type-aliases/Options.md)

</td>
<td>

Lexer options object.

</td>
</tr>
</tbody>
</table>

### Returns

[`Lexer`](../type-aliases/Lexer.md)

## Call Signature

```ts
function createLexer(rules: Rules, options?: Options): Lexer
```

Create a lexer function.

### Parameters

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

`rules`

</td>
<td>

[`Rules`](../type-aliases/Rules.md)

</td>
<td>

Non-empty array of lexing rules.

Rules are processed in provided order, first match is taken.

Rules can have the same name - you can have separate rules
for keywords and use the same name "keyword" for example.

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

[`Options`](../type-aliases/Options.md)

</td>
<td>

Lexer options object.

</td>
</tr>
</tbody>
</table>

### Returns

[`Lexer`](../type-aliases/Lexer.md)
