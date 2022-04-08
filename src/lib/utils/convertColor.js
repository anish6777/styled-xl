function convertColor(inp = "") {
  const newinp = inp.replace("#", "FF");
  return newinp.toUpperCase();
}

export default convertColor;
