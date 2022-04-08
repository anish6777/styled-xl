import getColumnNameFromIndex from "./getColumnNameFromIndex";
import createConditionalFormatXML from "./createConditionalFormatXML";

function createColumnForObjectArray(
  inp,
  addStyle,
  addConditionalStyle,
  numRows
) {
  let colsStyles = {};
  let headerStyles = {};
  let colsXml = "<cols>";
  let conditionalFormatXML = "";
  let formulaMap={};
  if (Array.isArray(inp)) {
    for (let i = 0; i < inp.length; i++) {
      const currentCol = inp[i];
      if (currentCol && typeof currentCol === "object") {
        formulaMap[currentCol["key"]]= (k) => getColumnNameFromIndex(i, k);
        if (currentCol.conditionalFormatRules) {
          const firstCell = getColumnNameFromIndex(i, 2);
          const lastCell = getColumnNameFromIndex(i, numRows + 1);
          let range = `${firstCell}:${lastCell}`;
          if (currentCol.applyConditionalFormatToCols) {
            if (
              currentCol.applyConditionalFormatToCols === "all" ||
              currentCol.applyConditionalFormatToCols.includes("all")
            ) {
              const newFirstCell = getColumnNameFromIndex(0, 2);
              const newLastCell = getColumnNameFromIndex(
                inp.length - 1,
                numRows + 1
              );
              range = `${newFirstCell}:${newLastCell}`;
            } else {
              range = "";
              for (let j = 0; j < inp.length; j++) {
                const currentColIn = inp[j];
                if (currentColIn && typeof currentColIn === "object") {
                  if (
                    currentCol.applyConditionalFormatToCols.includes(
                      currentColIn["key"]
                    )
                  ) {
                    const newFirstCell = getColumnNameFromIndex(j, 2);
                    const newLastCell = getColumnNameFromIndex(j, numRows + 1);
                    range += `${
                      range ? "," : ""
                    }${newFirstCell}:${newLastCell}`;
                  }
                }
              }
            }
          }
          conditionalFormatXML += createConditionalFormatXML(
            currentCol.conditionalFormatRules,
            range,
            addConditionalStyle,
            firstCell,
            inp
          );
        }
        if (currentCol.width || (currentCol.style && currentCol.style.width)) {
          colsXml += `<col min="${i + 1}" max="${i + 1}" width="${
            currentCol.width || (currentCol.style && currentCol.style.width)
          }" customWidth="1"/>`;
        }
        if (currentCol.style) {
          const colStyleId = addStyle(currentCol.style);
          colsStyles[i] = colStyleId;
        }
        if (currentCol.headerStyle) {
          const headerStyleId = addStyle(currentCol.headerStyle);
          headerStyles[i] = headerStyleId;
        }
      }
    }
  }
  colsXml = colsXml === "<cols>" ? "" : colsXml + "</cols>";
  return { colsXml, colsStyles, conditionalFormatXML, headerStyles,formulaMap };
}

export default createColumnForObjectArray;
