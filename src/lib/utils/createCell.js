import createFormulaCell from "./createFormulaCell";
import createStringCell from "./createStringCell";
import createNumberCell from "./createNumberCell";

function createCell(
  r,
  value,
  rowStyleId,
  addStyle,
  updateRowHeight,
  rowNum,
  rowSpan,
  mergedCells
) {
  let styleId = rowStyleId;
  if (typeof value === "object") {
    if (value.style) {
      styleId = addStyle(value.style);
      if (value.style.height) {
        updateRowHeight(value.style.height);
      }
    }
    if (value.type == "formula") {
      return createFormulaCell(r, value.element, styleId);
    } else if (value.type == "number") {
      if (typeof value.element === "string") {
        return createStringCell(r, value.element, styleId);
      }
      return createNumberCell(r, value.element, styleId);
    } else {
      const valueElement = String(value.element);
      return createStringCell(r, valueElement, styleId);
    }
  } else if (typeof value === "number") {
    return createNumberCell(r, value, styleId);
  }
  value = String(value);
  return createStringCell(r, value, styleId);
}

export default createCell;
