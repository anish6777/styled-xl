function createAlignment(horizontalAlign, verticalAlign, wrapText) {
  if (horizontalAlign || verticalAlign || wrapText) {
    return `<alignment${
      horizontalAlign ? ' horizontal="' + horizontalAlign + '"' : ""
    }${verticalAlign ? ' vertical="' + verticalAlign + '"' : ""}${
      wrapText ? ' wrapText="1"' : ""
    }/>`;
  }
  return "";
}

export default createAlignment;
