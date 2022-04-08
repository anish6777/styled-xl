function createFormulaCell(r,element,styleId){
  return `<c r="${r}" ${styleId ? ('s="'+styleId+'"'):""}><f>${element}</f></c>`  
}

export default createFormulaCell;
