const filterRules = (rule, color, level, network, status, KO) => {
  return (
    rule.color === color &&
    rule.level === level &&
    rule.network === network &&
    rule.status === status &&
    String(rule.KO) == String(KO)
  );
};

module.exports = { filterRules };
