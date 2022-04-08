function createNumberCell(r, element, styleId) {
  return `<c r="${r}" ${
    styleId ? 's="' + styleId + '"' : ""
  }><v>${element}</v></c>`;
}

export default createNumberCell;
