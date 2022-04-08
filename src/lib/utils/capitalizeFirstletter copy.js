function capitalizeFirstletter(inp="") {
  return inp.charAt(0).toUpperCase() + inp.slice(1).toLowerCase();
}

export default capitalizeFirstletter;