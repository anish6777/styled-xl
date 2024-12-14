const formats = {
  "0": "1",
  "General": "0",
  "0.00": "2",
  "#,##0": "3",
  "#,##0.00": "4",
  "0%": "9",
  "0.00%": "10",
  "0.00E+00": "11",
  "# ?/?": "12",
  "# ??/??": "13",
  "mm-dd-yy": "14",
  "d-mmm-yy": "15",
  "d-mmm": "16",
  "mmm-yy": "17",
  "h:mm AM/PM": "18",
  "h:mm:ss AM/PM": "19",
  "h:mm": "20",
  "h:mm:ss": "21",
  "m/d/yy h:mm": "22",
  "#,##0 ;(#,##0)": "37",
  "#,##0 ;[Red](#,##0)": "38",
  "#,##0.00;(#,##0.00)": "39",
  "#,##0.00;[Red](#,##0.00)": "40",
  "mm:ss": "45",
  "[h]:mm:ss": "46",
  "mmss.0": "47",
  "##0.0E+0": "48",
  "@": "49",
  "0.000": "50",
  "#,##0.000": "51",
  "0.0000": "52",
  "#,##0.0000": "53",
}

function createNumberFormat(formatCode,i) {
  const formatId = formats[formatCode];
  if(formatCode && formatId){
    return `<numFmt numFmtId="${163+i}" formatCode="${formatCode}"/>`
  }
  return "";
}

export default createNumberFormat;
