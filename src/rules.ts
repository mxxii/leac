import type { Rule, StringRule, RegexRule, ReplacementRule, UnifiedRule } from './types.ts';


export function toUnifiedRule (r: Rule, i: number): UnifiedRule {
  return {
    name: r.name,
    discard: r.discard,
    push: r.push,
    pop: r.pop,
    regex: toRegExp(r, i),
    replacer: isReplacementRule(r)
      ? toReplacer(r.regex, r.replace)
      : undefined,
  };
}

function isStringRule (r: Rule): r is StringRule {
  return Object.prototype.hasOwnProperty.call(r, 'str');
}

function isRegexRule (r: Rule): r is RegexRule {
  return Object.prototype.hasOwnProperty.call(r, 'regex');
}

function isReplacementRule (r: Rule): r is ReplacementRule {
  return Object.prototype.hasOwnProperty.call(r, 'replace');
}

function toReplacer (re: RegExp, replace: string): (match: string) => string {
  const replaceSearch = toNonSticky(re);
  return (match: string) => match.replace(replaceSearch, replace);
}

function toRegExp (r: Rule, i: number): RegExp {
  if (r.name.length === 0) {
    throw new Error(
      `Rule #${i} has empty name, which is not allowed.`,
    );
  }
  if (isRegexRule(r)) {
    return toSticky(r.regex);
  }
  if (isStringRule(r)) {
    if (r.str.length === 0) {
      throw new Error(
        `Rule #${i} ("${r.name}") has empty "str" property, which is not allowed.`,
      );
    }
    return new RegExp(escapeRegExp(r.str), 'y');
  }
  return new RegExp(escapeRegExp(r.name), 'y');
}

function escapeRegExp (str: string) {
  return str.replace(/[-[\]{}()*+!<=:?./\\^$|#\s,]/g, '\\$&');
}

function toSticky (re: RegExp) {
  if (re.global) {
    throw new Error(
      `Regular expression /${re.source}/${re.flags} contains the global flag, which is not allowed.`,
    );
  }
  return (re.sticky)
    ? re
    : new RegExp(re.source, re.flags + 'y');
}

function toNonSticky (re: RegExp) {
  return (re.sticky)
    ? new RegExp(re.source, re.flags.replace('y', ''))
    : re;
}
