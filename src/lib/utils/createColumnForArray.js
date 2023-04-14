import getColumnNameFromIndex from "./getColumnNameFromIndex";
import createConditionalFormatXML from "./createConditionalFormatXML";

function createColumnForArray(inp, addStyle, addConditionalStyle, numRows) {
  let colsStyles = {};
  let colsXml = "<cols>";
  let conditionalFormatXML = "";
  if (Array.isArray(inp)) {
    for (let i = 0; i < inp.length; i++) {
      const currentCol = inp[i];
      if (currentCol && typeof currentCol === "object") {
        if (currentCol.conditionalFormatRules) {
          const firstCell = getColumnNameFromIndex(
            currentCol.columnIndex - 1,
            1
          );
          const lastCell = getColumnNameFromIndex(
            currentCol.columnIndex - 1,
            numRows
          );
          const range = `${firstCell}:${lastCell}`;
          conditionalFormatXML += createConditionalFormatXML(
            currentCol.conditionalFormatRules,
            range,
            addConditionalStyle
          );
        }
        if (currentCol.width && currentCol.columnIndex) {
          colsXml += `<col min="${currentCol.columnIndex}" max="${currentCol.columnIndex}" width="${currentCol.width}" customWidth="1"/>`;
        }
        if (currentCol.style) {
          const colStyleId = addStyle(currentCol.style);
          colsStyles[currentCol.columnIndex - 1] = colStyleId;
        }
      }
    }
  }
  colsXml = colsXml === "<cols>" ? "" : colsXml + "</cols>";
  console.log("ccA colsXml",colsXml)
  console.log("ccA colsStyles",colsStyles)

  return { colsXml, colsStyles, conditionalFormatXML };
}

export default createColumnForArray;
