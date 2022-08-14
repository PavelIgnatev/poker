function renderRule(rule) {
  return `(${rule?.type}(${rule?.values.join(",")}) 
    || ${rule?.offpeak ? "isOffpeak" : false})
    && network === '${rule?.network}'
    && color === '${rule?.color}'
    && level === '${rule?.level}'
    && ${rule?.KO ? "isKo" : "!isKo"}`;
}

module.exports = { renderRule };
