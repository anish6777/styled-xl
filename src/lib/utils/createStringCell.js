import escapeChars from "./escapeChars";

function createStringCell(r, element, styleId) {
  return `<c r="${r}" ${
    styleId ? 's="' + styleId + '"' : ""
  } t="inlineStr"><is><t>${escapeChars(element)}</t></is></c>`;
}

export default createStringCell;
