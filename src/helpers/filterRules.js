const filterRules = (rule, level, network, status, KO, type, values) => {
  return (
    rule.level === level &&
    rule.network === network &&
    rule.status === status &&
    String(rule.KO) == String(KO) &&
    (type ? rule.type === type : true) &&
    (values ? JSON.stringify(rule.values) === JSON.stringify(values) : true)
  );
};

module.exports = { filterRules };
