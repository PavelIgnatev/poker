function renderCheckFalse(rule) {
  return `if(${rule}) return false;`;
}

module.exports = { renderCheckFalse };
