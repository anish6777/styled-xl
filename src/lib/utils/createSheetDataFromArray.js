import createConditionalFormatXML from "./createConditionalFormatXML";
import createRow from "./createRow";
import createMergedCellsXML from "./createMergedCellsXML";
import createSheetXML from "./createSheetXML";
import createColumnForArray from "./createColumnForArray";
import getColumnNameFromIndex from "./getColumnNameFromIndex";

function createSheetDataFromArray(
  elements,
  columnConfig,
  addStyle,
  styleId,
  addConditionalStyle,
  conditionalFormatRules,
  mergedCells,
  autoFilter
) {
  let conditionalFormattingXml = "";
  if (
    Array.isArray(conditionalFormatRules) &&
    conditionalFormatRules.length > 0
  ) {
    conditionalFormatRules.forEach(
      (cfr) =>
        (conditionalFormattingXml += createConditionalFormatXML(
          cfr.rules,
          cfr.range,
          addConditionalStyle
        ))
    );
  }
  const { colsXml, colsStyles, conditionalFormatXML } = createColumnForArray(
    columnConfig,
    addStyle,
    addConditionalStyle,
    elements.length
  );
  let autofilterRange;
  let afRange = { numCols: 0, numRows: elements.length };

  let sheetDataXml = `<sheetData>`;
  for (let i = 0; i < elements.length; i++) {
    sheetDataXml += createRow(
      i + 1,
      elements[i],
      addStyle,
      styleId,
      colsStyles,
      null,
      afRange,
      autoFilter
    );
  }

  conditionalFormattingXml += conditionalFormatXML;
  sheetDataXml += `</sheetData>`;
  if (autoFilter && afRange) {
    autofilterRange = `A1:${getColumnNameFromIndex(
      afRange.numCols - 1,
      afRange.numRows
    )}`;
  }
  const mergedCellsXML = createMergedCellsXML(mergedCells);
  return createSheetXML(
    sheetDataXml,
    colsXml,
    conditionalFormattingXml,
    mergedCellsXML,
    autofilterRange
  );
}

export default createSheetDataFromArray;
