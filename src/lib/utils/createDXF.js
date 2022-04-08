function createDXF(font, fill, border,numberFormatId) {
  return `<dxf>${numberFormatId ? ' numFmtId="' + numberFormatId + '" applyNumberFormat="1"' : ""}${font || ""}${fill || ""}${border || ""}</dxf>`;
}

export default createDXF;
