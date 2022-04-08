function escapeChars(inp = "") {
  return inp
    .replace("&", "&#38;")
    .replace("<", "&#60;")
    .replace(">", "&#62;")
    .replace("'", "&#39;")
    .replace('"', "&#34;");
}

export default escapeChars;
