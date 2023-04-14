import getColumnNameFromIndex from "./getColumnNameFromIndex";
import createCell from "./createCell";

function createRowFromArray(
  r,
  arr = [],
  rowStyleId,
  addStyle,
  colsStyles,
  updateRowHeight,
  rowSpan,
  mergedCells
) {
  let rowXML = "";
  if (Array.isArray(arr)) {
    for (let i = 0; i < arr.length; i++) {
      let cellId = "";
      let styleId = null;
      if (colsStyles && colsStyles[i]) {
        console.log("cRFA i:",i," arr[i]:",arr[i]," colsStyles[i]:",colsStyles[i])
        styleId = colsStyles[i];
      }
      cellId = getColumnNameFromIndex(i, r);
      rowXML += createCell(
        cellId,
        arr[i],
        styleId || rowStyleId,
        addStyle,
        updateRowHeight,
        r,
        rowSpan,
        mergedCells
      );
    }
  }
  return rowXML;
}

export default createRowFromArray;
