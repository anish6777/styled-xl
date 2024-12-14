function escapeChars(inp = "") {
  return inp
    .replaceAll("&", "&#38;")
    .replaceAll("<", "&#60;")
    .replaceAll(">", "&#62;")
    .replaceAll("'", "&#39;")
    .replaceAll('"', "&#34;");
}

export default escapeChars;
