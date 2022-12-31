function renderCheckFalse(rule) {
  return `if(${rule}) return { valid: false, guarantee: 0, rules: false };`;
}

module.exports = { renderCheckFalse };
