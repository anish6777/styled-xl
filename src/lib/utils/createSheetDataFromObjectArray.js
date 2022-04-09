import getHeaderFromColumnConfig from "./getHeaderFromColumnConfig";
import getElementsFromColumnConfig from "./getElementsFromColumnConfig";
import createColumnForObjectArray from "./createColumnForObjectArray";
import createConditionalFormatXML from "./createConditionalFormatXML";
import createRow from "./createRow";
import createMergedCellsXML from "./createMergedCellsXML";
import createSheetXML from "./createSheetXML";
import getColumnNameFromIndex from "./getColumnNameFromIndex";

function createSheetDataFromObjectArray(
  elements,
  columnConfig,
  addStyle,
  styleId,
  headerStyleId,
  addConditionalStyle,
  conditionalFormatRules,
  lastRow,
  mergedCells = [],
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
  const {
    colsXml,
    colsStyles,
    conditionalFormatXML,
    headerStyles,
    formulaMap,
  } = createColumnForObjectArray(
    columnConfig,
    addStyle,
    addConditionalStyle,
    elements.length
  );
  const headers = getHeaderFromColumnConfig(columnConfig, elements);
  let sheetDataXml = `<sheetData>`;
  let sheetDataXmlRows = "";
  for (let i = 0; i < elements.length; i++) {
    const objectElements = getElementsFromColumnConfig(
      columnConfig,
      elements[i],
      headers,
      formulaMap,
      i
    );
    sheetDataXmlRows += createRow(
      i + 2,
      objectElements,
      addStyle,
      styleId,
      colsStyles
    );
  }
  let sheetDataXmlHeader = createRow(
    1,
    headers,
    addStyle,
    headerStyleId || styleId,
    headerStyles,
    colsStyles
  );
  sheetDataXml += sheetDataXmlHeader + sheetDataXmlRows;
  if (lastRow) {
    let lastRowStyleId;
    if (lastRow.style) {
      lastRowStyleId = addStyle(lastRow.style);
    }
    sheetDataXml += createRow(
      elements.length + 2,
      lastRow.elements || lastRow,
      addStyle,
      lastRowStyleId || styleId,
      null,
      null,
      null,
      null,
      lastRow.rowSpan,
      mergedCells
    );
  }
  conditionalFormattingXml += conditionalFormatXML;
  sheetDataXml += `</sheetData>`;
  let autofilterRange;
  if (autoFilter) {
    autofilterRange = `A1:${getColumnNameFromIndex(
      headers.length - 1,
      elements.length + 1
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

export default createSheetDataFromObjectArray;
