function renderCheckFalse(rule) {
  return `if(${rule}) return { valid: false, guarantee: 1, rules: false };`;
}

module.exports = { renderCheckFalse };
