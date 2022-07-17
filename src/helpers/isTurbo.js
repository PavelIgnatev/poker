const { getNetwork } = require('./getNetwork');
const { isSuperTurbo } = require('./isSuperTurbo');

/**
 * Возвращае true, если турнир является turbo
 * @param {Object} tournament Экземпляр объекта tournament
 * @return {boolean} True, если турнир является turbo
 */

const isTurbo = (tournament) => {
  let flags = tournament['@flags'];
  const name = (tournament['@name'] ?? '').toLowerCase();
  const network = getNetwork(tournament['@network']);
  const superturbo = isSuperTurbo(tournament);
  const isSat = flags?.includes('SAT');
  if (isSat) flags = flags.replace('SAT', '');

  const turbo =
    (flags?.includes('T') ||
      name?.includes('turbo') ||
      (network === 'PS.eu' && name?.includes('hot'))) &&
    !superturbo;

  return turbo;
};

module.exports = { isTurbo };
