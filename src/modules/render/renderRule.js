function renderRule(rule) {
  const { type, values, offpeak, network, color, level, KO, status } = rule;

  // Offpeak рендерить по другому
  return `(${type}(${values.join(",")}) 
    || ${offpeak ? "isOffpeak" : false})
    && network === '${network}'
    && color === '${color}'
    && level === '${level}'
    && is${status}
    && ${KO ? "isKo" : "!isKo"}`;
}

module.exports = { renderRule };
