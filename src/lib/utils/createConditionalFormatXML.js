import createRule from "./createRule";
import getColumnNameFromIndex from "./getColumnNameFromIndex";

function createConditionalFormatXML(
  rules = [],
  range,
  addConditionalStyle,
  fc,
  inp
) {
  let rulesXML = `<conditionalFormatting sqref="${range}">`;
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    if (Array.isArray(inp)) {
      for (let j = 0; j < inp.length; j++) {
        const currKey = `[${inp[j].key}]`;
        if (rule.value && rule.value.includes && rule.value.includes(currKey)) {
          const columnName = getColumnNameFromIndex(j, 2);
          rule.value = rule.value.replace(currKey, "$" + columnName);
        }
      }
    }
    const firsctCell = fc || range.split(":")[0];
    const newRule = createRule(rule, addConditionalStyle, range, firsctCell, i);
    rulesXML += newRule;
  }
  rulesXML += `</conditionalFormatting>`;
  return rulesXML;
}

export default createConditionalFormatXML;
