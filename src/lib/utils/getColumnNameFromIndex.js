const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function getColumnNameFromIndex(input, rowNum) {
  let colName = "";
  if (Math.floor(input / 26) > 0) {
    if (Math.floor(input / 26) > 26) {
      return;
    }
    colName += alphabets[Math.floor(input / 26) - 1];
    colName += alphabets[input % 26] + rowNum;
  } else {
    colName = alphabets[input] + rowNum;
  }
  return colName;
}

export default getColumnNameFromIndex;
