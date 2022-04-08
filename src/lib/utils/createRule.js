function createCelllsRule(operator, dxfId, priority, value) {
  return `<cfRule type="cellIs" dxfId="${dxfId}" priority="${priority}" operator="${operator}"><formula>${value}</formula></cfRule>`;
}

function createRule(rule, addConditionalStyle, range, firsctCell, priority) {
  const dxfId = addConditionalStyle(rule.style);
  switch (rule.type) {
    case "expression":
      return `<cfRule type="expression" dxfId="${dxfId}" priority="${priority}" operator="expression"><formula>${rule.value}</formula></cfRule>`;
      break;
    case "equal":
      return createCelllsRule("equal", dxfId, priority, rule.value);
      break;
    case "between":
      return `<cfRule type="cellIs" dxfId="${dxfId}" priority="${priority}" operator="between"><formula>${rule.value}</formula><formula>${rule.secondValue}</formula></cfRule>`;
      break;
    case "lessThan":
      return createCelllsRule("lessThan", dxfId, priority, rule.value);
      break;
    case "greaterThan":
      return createCelllsRule("greaterThan", dxfId, priority, rule.value);
      break;
    case "notContainsText":
      return `<cfRule type="notContainsText" dxfId="${dxfId}" priority="${priority}" operator="notContainsText" text="${rule.text}"><formula>ISERROR(SEARCH("${rule.text}",${firsctCell}))</formula></cfRule>`;
      break;
    case "containsText":
      return `<cfRule type="containsText" dxfId="${dxfId}" priority="${priority}" operator="containsText" text="${rule.text}"><formula>NOT(ISERROR(SEARCH("${rule.text}",${firsctCell})))</formula></cfRule>`;
      break;
    case "beginsWith":
      return `<cfRule type="beginsWith" dxfId="${dxfId}" priority="${priority}" operator="beginsWith" text="${rule.text}"><formula>NOT(ISERROR(SEARCH("${rule.text}",LEFT(${firsctCell},LEN("${rule.text}")))))</formula></cfRule>`;
      break;
    case "endsWith":
      return `<cfRule type="endsWith" dxfId="${dxfId}" priority="${priority}" operator="endsWith" text="${rule.text}"><formula>NOT(ISERROR(SEARCH("${rule.text}",RIGHT(${firsctCell},LEN("${rule.text}")))))</formula></cfRule>`;
      break;
    case "aboveAverage":
      return `<cfRule type="aboveAverage" dxfId="${dxfId}" priority="${priority}" operator="aboveAverage"><formula>IF(${firsctCell}>AVERAGE(${range}),true,false)</formula></cfRule>`;
      break;
    default:
      return ``;
  }
}

export default createRule;
