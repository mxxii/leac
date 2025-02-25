import type { Lexer, Options, Rules, Token } from './types.ts';
export type { Lexer, Options, Rules, Token, LexerResult, Rule, StringRule, RegexRule, ReplacementRule } from './types.ts';

import { createPositionQuery } from './positionQuery.ts';
import { toUnifiedRule } from './rules.ts';

/**
 * Create a lexer function.
 *
 * @param rules - Non-empty array of lexing rules.
 *
 * Rules are processed in provided order, first match is taken.
 *
 * Rules can have the same name - you can have separate rules
 * for keywords and use the same name "keyword" for example.
 *
 * @param state - The name of this lexer. Use when composing lexers.
 * Empty string by default.
 *
 * @param options - Lexer options object.
 */
export function createLexer (
  rules: Rules,
  state?: string,
  options?: Options
): Lexer;

/**
 * Create a lexer function.
 *
 * @param rules - Non-empty array of lexing rules.
 *
 * Rules are processed in provided order, first match is taken.
 *
 * Rules can have the same name - you can have separate rules
 * for keywords and use the same name "keyword" for example.
 *
 * @param options - Lexer options object.
 */
export function createLexer (
  rules: Rules,
  options?: Options
): Lexer;

export function createLexer (
  rules: Rules,
  state: string | Options = '',
  options: Options = {},
): Lexer {
  const options1 = (typeof state !== 'string') ? state : options;
  const state1 = (typeof state === 'string') ? state : '';
  const unifiedRules = rules.map(toUnifiedRule);
  const isLineNumbers = !!options1.lineNumbers;
  return function (str: string, offset = 0) {
    const positionQuery = (isLineNumbers)
      ? createPositionQuery(str)
      : undefined;
    let position = { line: 0, column: 0 };
    let currentIndex = offset;
    const tokens: Token[] = [];
    loopStr:
    while (currentIndex < str.length) {
      let anyMatch = false;
      for (const rule of unifiedRules) {
        rule.regex.lastIndex = currentIndex;
        const match = rule.regex.exec(str);
        if (match && match[0].length > 0) {
          if (!rule.discard) {
            if (positionQuery) {
              position = positionQuery(currentIndex);
            }
            tokens.push({
              state: state1,
              name: rule.name,
              text: (rule.replacer) ? rule.replacer(match[0]) : match[0],
              offset: currentIndex,
              len: match[0].length,
              line: position.line,
              column: position.column,
            });
          }
          currentIndex = rule.regex.lastIndex;
          anyMatch = true;
          if (rule.push) {
            const r = rule.push(str, currentIndex);
            tokens.push(...r.tokens);
            currentIndex = r.offset;
          }
          if (rule.pop) {
            break loopStr;
          }
          break;
        }
      }
      if (!anyMatch) {
        break;
      }
    }
    return {
      tokens: tokens,
      offset: currentIndex,
      complete: str.length <= currentIndex,
    };
  };
}
