[**leac v0.7.0-preview.1**](../index.md)

***

# Type Alias: Rules

```ts
type Rules = [
  | Rule
  | StringRule
  | RegexRule
  | ReplacementRule, ...(Rule | StringRule | RegexRule | ReplacementRule)[]];
```

Non-empty array of [Rule](../interfaces/Rule.md)s.

Rules are processed in provided order, first match is taken.

Rules can have the same name. For example, you can have
separate rules for various keywords and use the same name "keyword".
