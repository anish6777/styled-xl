function createXF(fontId, fillId, borderId, alignment,numberFormatId) {
  return `<xf${numberFormatId ? ' numFmtId="' + numberFormatId + '" applyNumberFormat="1"' : ""}${fontId ? ' fontId="' + fontId + '" applyFont="1"' : ""}${
    fillId ? ' fillId="' + fillId + '" applyFill="1"' : ""
  }${borderId ? ' borderId="' + borderId + '" applyBorder="1"' : ""}>${
    alignment ? alignment : ""
  }</xf>`;
}

export default createXF;
