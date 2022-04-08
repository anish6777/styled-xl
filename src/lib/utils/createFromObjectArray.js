import createWorkbookXML from "./createWorkbookXML";
import createStyles from "./createStyles";
import createSheetDataFromObjectArray from "./createSheetDataFromObjectArray";
import { workbookXMLRels, contentTypes, rels } from "./constants";

function createFromObjectArray(
  title,
  data,
  defaultStyle = { backgroundColor: "#F2F4F5", fontColor: "#000000" },
  headerStyle = {
    backgroundColor: "#7F8282",
    fontColor: "#ffffff",
    borderColor: "#000000",
  },
  columnConfig,
  lastRow,
  autoFilter,
  conditionalFormatRules,
  mergedCells
) {
  const styleCreator = createStyles({}, defaultStyle);
  let headerStyleId;
  if (headerStyle) {
    headerStyleId = styleCreator.addStyle(headerStyle);
  }
  let sheetXML = createSheetDataFromObjectArray(
    data,
    columnConfig,
    styleCreator.addStyle,
    styleCreator.defaultId,
    headerStyleId,
    styleCreator.addConditionalStyle,
    conditionalFormatRules,
    lastRow,
    mergedCells,
    autoFilter
  );

  const workbookXML = createWorkbookXML(title);
  const zip = new JSZip();
  const xl = zip.folder("xl");
  xl.file("workbook.xml", workbookXML);
  xl.file("styles.xml", styleCreator.xml());
  xl.file("_rels/workbook.xml.rels", workbookXMLRels);
  zip.file("_rels/.rels", rels);
  zip.file("[Content_Types].xml", contentTypes);
  xl.file("worksheets/Sheet1.xml", sheetXML);
  return zip
    .generateAsync({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })
    .then((blob) => {
      return blob;
    });
}

export default createFromObjectArray;
