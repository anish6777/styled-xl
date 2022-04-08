function createMergedCellXML(range) {
  return range ? `<mergeCell ref="${range}"/>` : "";
}
export default createMergedCellXML;
