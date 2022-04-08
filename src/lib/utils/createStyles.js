import createFill from "./createFill";
import createFont from "./createFont";
import createAlignment from "./createAlignment";
import createBorder from "./createBorder";
import createXF from "./createXF";
import createDXF from "./createDXF";
import createNumberFormat from "./createNumberFormat";

function createStyles(inpStyles = {}, defaultStyles) {
  const stylesXMLHead = `<?xml version="1.0" ?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">`;
  const defaultFont = createFont(
    inpStyles.fontName || "calibri",
    inpStyles.fontFamily || "",
    inpStyles.fontWeight || "",
    inpStyles.fontSize || "15",
    inpStyles.fontColor || "",
    inpStyles.fontStyle || ""
  );
  const numberFormats=[];
  let defNumFormatId;
  if(inpStyles.format){
    const defaultNumberFormat = createNumberFormat(inpStyles.format,0);
    numberFormats.push(defaultNumberFormat);
  }
  const fonts = [];
  fonts.push(defaultFont);
  const borders = [];
  const defaultBorder = createBorder();
  let alignment = "";
  if (
    inpStyles.verticalAlignment ||
    inpStyles.horizontalAlignment ||
    inpStyles.wrapText
  ) {
    alignment = createAlignment(
      inpStyles.horizontalAlignment,
      inpStyles.verticalAlignment,
      inpStyles.wrapText
    );
  }
  borders.push(defaultBorder);
  const fills = [];
  const noneFill = createFill("", "none");
  fills.push(noneFill);
  const grayFill = createFill("", "gray125");
  fills.push(grayFill);
  const xfs = [];
  const defaultxf = createXF("0", null, null, alignment,defNumFormatId);
  xfs.push(defaultxf);
  const dxfs = [];
  function xml() {
    let stylesXML = stylesXMLHead;
    const NumberFormatHead = `<numFmts count="${numberFormats.length}">`;
    stylesXML += NumberFormatHead.concat(...numberFormats, "</numFmts>");
    const FontHead = `<fonts count="${fonts.length}">`;
    stylesXML += FontHead.concat(...fonts, "</fonts>");
    const FillsHead = `<fills count="${fills.length}">`;
    stylesXML += FillsHead.concat(...fills, "</fills>");
    const BordersHead = `<borders count="${borders.length}">`;
    stylesXML += BordersHead.concat(...borders, "</borders>");
    const xfHead = `<cellXfs count="${xfs.length}">`;
    stylesXML += xfHead.concat(...xfs, "</cellXfs>");
    if (dxfs.length > 0) {
      const dxfHead = `<dxfs count="${dxfs.length}">`;
      stylesXML += dxfHead.concat(...dxfs, "</dxfs>");
    }
    stylesXML += "</styleSheet>";
    return stylesXML;
  }
  function addStyle(newStyles = {}, isConditional) {
    let numFormatId;
    if(newStyles.format){
      let id = numberFormats.findIndex((f) => f.includes(`"${newStyles.format}"`));
      if (String(id) === "-1") {
        const newNumberFormat = createNumberFormat(newStyles.format,numberFormats.length);
        numberFormats.push(newNumberFormat);
        numFormatId = String(163+numberFormats.length - 1);
      }
      else{
        numFormatId = String(163+id);
      }
    }
    const newFont = createFont(
      newStyles.fontName || "calibri",
      newStyles.fontFamily || "",
      newStyles.fontWeight || "",
      newStyles.fontSize || "15",
      newStyles.fontColor || "",
      newStyles.fontStyle || ""
    );
    let fontId = String(fonts.findIndex((f) => f === newFont));
    if (fontId === "-1") {
      fonts.push(newFont);
      fontId = String(fonts.length - 1);
    }
    const newFill = createFill(
      newStyles.backgroundColor,
      newStyles.patternStyle,
      isConditional
    );
    let fillId = String(fills.findIndex((f) => f === newFill));
    if (fillId === "-1") {
      fills.push(newFill);
      fillId = String(fills.length - 1);
    }
    let alignment;
    if (
      newStyles.verticalAlignment ||
      newStyles.horizontalAlignment ||
      newStyles.wrapText
    ) {
      alignment = createAlignment(
        newStyles.horizontalAlignment,
        newStyles.verticalAlignment,
        newStyles.wrapText
      );
    }
    const newBorder = createBorder(newStyles.borderPositions, {
      color: newStyles.borderColor || newStyles.fontColor,
      style: newStyles.borderStyle || "hair",
    });
    let borderId = String(borders.findIndex((f) => f === newBorder));
    if (borderId === "-1") {
      borders.push(newBorder);
      borderId = String(borders.length - 1);
    }
    const newxf = createXF(fontId, fillId, borderId, alignment,numFormatId);
    let xfId = String(xfs.findIndex((f) => f === newxf));
    if (xfId === "-1") {
      xfs.push(newxf);
      xfId = xfs.length - 1;
    }
    return xfId;
  }
  function addConditionalStyle(newStyles = {}) {
    let newNumberFormat;
    
    let numFormatId;
    if(newStyles.format){
      let id = numberFormats.findIndex((f) => f.includes(`"${newStyles.format}"`));
      if (String(id) === "-1") {
        const newNumberFormat = createNumberFormat(newStyles.format,numberFormats.length);
        numberFormats.push(newNumberFormat);
        numFormatId = String(163+numberFormats.length - 1);
      }
      else{
        numFormatId = String(163+id);
      }
    }
    const newFont = createFont(
      newStyles.fontName || "calibri",
      newStyles.fontFamily || "",
      newStyles.fontWeight || "",
      newStyles.fontSize || "15",
      newStyles.fontColor || "",
      newStyles.fontStyle || ""
    );

    const newFill = createFill(
      newStyles.backgroundColor,
      newStyles.patternStyle,
      true
    );

    const newBorder = createBorder(newStyles.borderPositions, {
      color: newStyles.borderColor || newStyles.fontColor,
      style: newStyles.borderStyle || "hair",
    });

    const newdxf = createDXF(newFont, newFill, newBorder,numFormatId);
    let dxfId = String(dxfs.findIndex((f) => f === newdxf));
    if (dxfId === "-1") {
      dxfs.push(newdxf);
      dxfId = dxfs.length - 1;
    }
    return dxfId;
  }
  let defaultId;
  if (defaultStyles) {
    defaultId = addStyle(defaultStyles);
  }
  return { xml, addStyle, defaultId, addConditionalStyle };
}

export default createStyles;
