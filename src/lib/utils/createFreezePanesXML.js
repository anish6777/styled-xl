
import getColumnNameFromIndex from "./getColumnNameFromIndex";

function createFreezePanesXML(inp) {
  if (inp && inp.xSplit && inp.ySplit) {
    const topLeftCell = getColumnNameFromIndex(inp.xSplit,inp.ySplit+1)
    let freezePanesXML = `<sheetViews><sheetView tabSelected="1" workbookViewId="0"><pane xSplit="${inp.xSplit}" ySplit="${inp.ySplit}" topLeftCell="${topLeftCell}" state="frozen"></pane></sheetView></sheetViews>`;
    return freezePanesXML;
  }
  return "";
}

export default createFreezePanesXML;
