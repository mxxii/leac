const linebreaksRe = /\n/g;

export type Position = {
  line: number;
  column: number;
};

export function createPositionQuery (
  str: string,
): (offset: number) => Position {
  const offsets = [...str.matchAll(linebreaksRe)].map(m => m.index || 0);
  offsets.unshift(-1);
  let lineIndex = 1;
  return (offset: number) => {
    while (lineIndex > 1 && offset < offsets[lineIndex - 1]) {
      lineIndex--;
    }
    while (lineIndex < offsets.length && offset > offsets[lineIndex]) {
      lineIndex++;
    }
    return { line: lineIndex, column: offset - offsets[lineIndex - 1] };
  };
}
