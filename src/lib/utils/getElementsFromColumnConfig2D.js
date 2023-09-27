import getColumnNameFromIndex from "./getColumnNameFromIndex";

function getElementsFromColumnConfig(
  columnConfig,
  inp,
  r
) {
  let values = [];
  if (Array.isArray(columnConfig)) {
    const columnConfigMap = {};
    columnConfig.forEach(cc => {
      columnConfigMap[cc.columnIndex-1] = cc;
    })
    const elements = Array.isArray(inp) ? inp : (inp && inp.elements ? inp.elements : [] )
    if(Array.isArray(elements))
    for(let i=0;i<elements.length;i++){
      const cc = columnConfigMap[i]||{};
      if(elements[i] ==="applyFormula" && cc.type === "formula" && cc.formula ){
        let formula = cc.formula;
    for(let k=1;k <= elements.length;k++){
        formula = formula.replace(`[${k}]`, getColumnNameFromIndex(k-1,r+1));
    }
        values.push({ type: "formula", element: formula });
      }else{
        values.push(elements[i]);
      }
    }
    const output = Array.isArray(inp) ? values : (inp && inp.elements ? {...inp,elements:values} : {} )
    return output;
  }else{
    return elements
  }
}

export default getElementsFromColumnConfig;
