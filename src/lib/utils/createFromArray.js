import createWorkbookXML from "./createWorkbookXML";
import createStyles from "./createStyles";
import createSheetDataFromArray from "./createSheetDataFromArray";
import { workbookXMLRels, contentTypes, rels } from "./constants";
import jszip from 'jszip';

function createFromArray(
  title = "Sheet1",
  data = [],
  defaultStyle = { backgroundColor: "#F2F4F5", fontColor: "#000000" },
  columnConfig,
  autoFilter,
  conditionalFormatRules,
  mergedCells = [],
  sheetStyle = {},
  freezePanes
) {
  const styleCreator = createStyles(sheetStyle, defaultStyle);

  let sheetXML = createSheetDataFromArray(
    data,
    columnConfig,
    styleCreator.addStyle,
    styleCreator.defaultId,
    styleCreator.addConditionalStyle,
    conditionalFormatRules,
    mergedCells,
    autoFilter,
    freezePanes
  );

  const workbookXML = createWorkbookXML(title);
  const zip = new jszip();
  const xl = zip.folder("xl");
  xl.file("workbook.xml", workbookXML);
  xl.file("styles.xml", styleCreator.xml());
  xl.file("_rels/workbook.xml.rels", workbookXMLRels);
  zip.file("_rels/.rels", rels);
  zip.file("[Content_Types].xml", contentTypes);
  xl.file("worksheets/sheet1.xml", sheetXML);
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
export default createFromArray;
