import convertColor from "./convertColor";
import capitalizeFirstletter from "./capitalizeFirstletter";

function createFont(
  fontName,
  fontFamily = "Calibri",
  fontWeight,
  fontSize = "11",
  fontColor,
  fontStyle
) {
  return `<font><sz val="${fontSize}"/><color ${
    fontColor ? 'rgb="' + convertColor(fontColor) + '"' : 'theme="1"'
  }/><name val="${capitalizeFirstletter(fontName)}"/><family ${
    fontFamily ? 'val="' + fontFamily + '"' : 'val="2"'
  }/>${fontWeight === "bold" ? "<b/>" : ""}${
    fontStyle === "italic" ? "<i/>" : ""
  }</font>`;
}

export default createFont;
