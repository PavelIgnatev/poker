const { getNetwork } = require('./getNetwork');

/**
 * Возвращае true, если турнир является super turbo
 * @param {Object} tournament Экземпляр объекта tournament
 * @return {boolean} True, если турнир является super turbo
 */

const isSuperTurbo = (tournament) => {
  const superturbo = tournament['@flags']?.includes('ST');
  return superturbo;
};

module.exports = { isSuperTurbo };
