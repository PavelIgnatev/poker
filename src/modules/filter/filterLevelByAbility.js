const { getNetwork } = require('../../helpers/getNetwork');
const { isSuperTurbo } = require('../../helpers/isSuperTurbo');
const { filterLevelByRules } = require('../filter/filterLevelByRules');
const { filterLevelBySat } = require('../filter/filterLevelBySat');
const { filterLevelByWord } = require('../filter/filterLevelByWord');
const { filterLevelBySyperTurbo } = require('./filterLevelBySyperTurbo');
const { filterLevelByBrownRules } = require('./filterLevelByBrownRules');

/**
 * Возвращае true, если турнир прошел фильтрацию по правилам ability
 * @param {string} level Конкретный уровень
 * @param {Object} tournament Экземпляр объекта tournament
 * @return {boolean} True, если турнир прошел фильтрацию по правилам ability
 */

const filterLevelByAbility = (level, tournament) => {
  const sat = tournament['@flags']?.includes('SAT'),
    name = tournament['@name']?.toLowerCase(),
    network = getNetwork(tournament['@network']),
    abilityBid = tournament['@abilityBid'] === '-' ? '-' : Number(tournament['@abilityBid']),
    ability = tournament['@ability'] === '-' ? '-' : Number(tournament['@ability']);

  if (filterLevelBySat(level, tournament)) return true;
  // сателлиты на WNMX разрешены
  if (network !== 'WNMX' && sat) return false;
  if (filterLevelBySyperTurbo(level, tournament)) return true;
  // супер турбо разрешены только на WNMX
  if (network !== 'WNMX' && isSuperTurbo(tournament)) return false;
  if (filterLevelByWord(network, name)) return false;
  if (filterLevelByBrownRules(level, tournament)) return true;
  if (tournament['@sng'] || tournament['@od']) return false;

  if (
    !ability ||
    !abilityBid ||
    ability === '-' ||
    abilityBid === '-' ||
    tournament['@rebuy'] ||
    tournament['@structure'] !== 'NL' ||
    (tournament['@game'] !== 'H' && tournament['@game'] !== 'H6') ||
    ability > abilityBid
  ) {
    return filterLevelByRules(level, tournament);
  }

  return ability <= abilityBid;
};

module.exports = {
  filterLevelByAbility,
};
