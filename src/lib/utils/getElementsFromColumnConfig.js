function getElementsFromColumnConfig(
  columnConfig,
  elements,
  headers,
  formulaMap = {},
  r
) {
  let values = [];
  if (Array.isArray(columnConfig)) {
    columnConfig.forEach((cc) => {
      if (elements[cc.key] === undefined) {
        if (cc.type === "number") {
          values.push(0);
        } else if (cc.type === "formula") {
          let formula = cc.formula;

          if (formula) {
            const mapkeys = Object.keys(formulaMap);
            mapkeys.forEach((el) => {
              formula = formula.replace(`[${el}]`, formulaMap[el](r+2));
            });
            values.push({ type: "formula", element: formula });
          }
        } else {
          values.push("");
        }
      } else {
        values.push(elements[cc.key]);
      }
    });
  } else {
    const currentHeaders = Object.keys(elements);
    let difference = currentHeaders.filter((x) => !headers.includes(x));
    if (difference.length > 0) {
      headers.push.apply(headers, difference);
    }
    headers.forEach((cc) => {
      if (elements[cc] === undefined) {
        values.push("");
      } else {
        values.push(elements[cc]);
      }
    });
  }
  return values;
}

export default getElementsFromColumnConfig;
