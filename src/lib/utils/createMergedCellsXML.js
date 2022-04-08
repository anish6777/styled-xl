import createMergedCellXML from "./createMergedCellXML";

function createMergedCellsXML(inp) {
  if (Array.isArray(inp) && inp.length > 0) {
    let mergedCellsXML = `<mergeCells count="${inp.length}">`;
    for (let i = 0; i < inp.length; i++) {
      if (inp[i]) {
        mergedCellsXML += createMergedCellXML(inp[i]);
      }
    }
    mergedCellsXML += "</mergeCells>";
    return mergedCellsXML;
  }
  return "";
}

export default createMergedCellsXML;
