function renderCheck(rule) {
  return `if(${rule}) return true;`;
}

module.exports = { renderCheck };
