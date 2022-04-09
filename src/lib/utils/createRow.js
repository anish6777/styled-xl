import createRowFromArray from "./createRowFromArray";

function createRow(
  r,
  values = [],
  addStyle,
  sheetStyleId,
  colsStyles,
  secondaryColsStyles,
  afRange,
  autoFilter,
  rowSpan,
  mergedCells
) {
  let styleId = sheetStyleId;
  let rowXMLBody = ``;
  let rowHeight = 0;
  let rowSpanXMLs = "";
  let numCols = 0;

  function updateRowHeight(rh) {
    if (!rowHeight || rowHeight < rh) {
      rowHeight = rh;
    }
  }

  if (Array.isArray(values)) {
    numCols = values.length;
    rowXMLBody += createRowFromArray(
      r,
      values,
      styleId,
      addStyle,
      colsStyles,
      updateRowHeight,
      secondaryColsStyles,
      rowSpan,
      mergedCells
    );
  } else if (typeof values === "object") {
    if (values.height) {
      rowHeight = values.height;
    }
    if (values.style) {
      if (values.style.height) {
        updateRowHeight(values.style.height);
      }
      styleId = addStyle(values.style);
    }
    const arrayElements = values.elements;
    if (Array.isArray(arrayElements)) {
      numCols = arrayElements.length;
      rowXMLBody += createRowFromArray(
        r,
        arrayElements,
        styleId,
        addStyle,
        colsStyles,
        updateRowHeight,
        rowSpan,
        mergedCells
      );
    }
  }

  if (rowSpan && rowSpan > 1) {
    for (let i = 1; i < rowSpan; i++) {
      //rowSpanXMLs += `<row r="${r+i+1}" spans="1:1" x14ac:dyDescent="0.25"></row>`;
    }
  }
  if (autoFilter && afRange && afRange.numCols < numCols) {
    afRange.numCols = numCols;
  }
  return (
    `<row r="${r}"${
      rowHeight ? ' ht="' + rowHeight + '"  customHeight="1"' : ""
    } spans="1:1" x14ac:dyDescent="0.25">` +
    rowXMLBody +
    `</row>${rowSpanXMLs}`
  );
}

export default createRow;
