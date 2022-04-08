import convertColor from "./convertColor";

function createFill(backgroundColor, pattern, isConditional) {
  return `<fill><patternFill patternType="${pattern || "solid"}">${
    backgroundColor
      ? isConditional
        ? '<bgColor rgb="' + convertColor(backgroundColor) + '"/>'
        : '<fgColor rgb="' +
          convertColor(backgroundColor) +
          '"/><bgColor indexed="64"/>'
      : ""
  }</patternFill></fill>`;
}

export default createFill;
