import convertColor from "./convertColor";

function createBorder(
  positions = ["left", "right", "top", "bottom"],
  borderStyles = {}
) {
  const borders = [];
  borders.push("<border>");
  if (positions && Array.isArray(positions)) {
    positions.forEach((p) => {
      const style = borderStyles[p + "Style"] || borderStyles["style"];
      const color = borderStyles[p + "Color"] || borderStyles["color"];
      borders.push(
        `<${p}${style ? ' style="' + style + '"' : ""}>${
          color ? '<color rgb="' + convertColor(color) + '"/>' : ""
        }</${p}>`
      );
    });
  }
  borders.push("<diagonal/></border>");
  return "".concat(...borders);
}

export default createBorder;
