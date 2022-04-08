function getHeaderFromColumnConfig(columnConfig, elements) {
  let values = [];
  if (Array.isArray(columnConfig)) {
    columnConfig.forEach((cc) => values.push(cc.displayName));
    return values;
  }
  if (Array.isArray(elements) && elements.length > 0) {
    return Object.keys(elements[0]);
  }
}

export default getHeaderFromColumnConfig;
