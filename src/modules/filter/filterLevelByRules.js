const { getNetwork } = require('../../helpers/getNetwork');
const {
  MELE: mele,
  MELEI: melei,
  EME: eme,
  EMEI: emei,
  MELEME: meleme,
  EI: ei,
  StartDay: sd,
  I,
} = require('../../helpers/curry');
const { isSuperTurbo } = require('../../helpers/isSuperTurbo');

/**
 * Возвращае true, если турнир прошел фильтрацию по правилам уровня
 * @param {string} level Конкретный уровень
 * @param {Object} tournament Экземпляр объекта tournament
 * @return {boolean} True, если турнир прошел фильтрацию по правилам уровня
 */

const filterLevelByRules = (level, tournament) => {
  const name = tournament['@name']?.toLowerCase(),
    network = getNetwork(tournament['@network']),
    isKO = tournament['@bounty'],
    bid = Number(tournament['@bid']),
    prizepool = Number(tournament['@prizepool']),
    weekDay = tournament['@getWeekday'],
    MELE = mele(bid),
    MELEI = melei(name)(bid),
    EME = eme(bid)(prizepool),
    EMEI = emei(name)(bid)(prizepool),
    MELEME = meleme(bid)(prizepool),
    EI = ei(name)(bid),
    StartDay = sd(weekDay),
    eI = I(name);

  if (!name) return false;

  //Фильтр снг для румов, отличных от PS.eu
  if (network !== 'PS.eu' && tournament['@sng']) return false;

  if (level === '7A') {
    if (network === 'PS.eu') {
      if (!tournament['@turbo']) {
        //Синие
        if (tournament['@rebuy']) {
          if (MELE(1.0)(7.5)) return true;
        } else {
          if (MELE(1.0)(33.0)) return true;
        }

        if (isKO) {
          if (EME(109.0)(100000)) return true;
          if (EME(82.0)(60000)) return true;
          if (EME(55.0)(30000)) return true;
          if (EME(44.0)(10000)) return true;
        } else {
          if (EME(109.0)(150000)) return true;
          if (EME(82.0)(100000)) return true;
          if (EME(55.0)(60000)) return true;
          if (EME(44.0)(40000)) return true;
        }
      } else if (!tournament['@rebuy']) {
        //Красные
        if (MELE(1.0)(16.5)) return true;

        if (isKO) {
          if (EME(109.0)(300000)) return true;
          if (EME(82.0)(215000)) return true;
          if (EME(55.0)(100000)) return true;
          if (EME(44.0)(50000)) return true;
          if (EME(33.0)(25000)) return true;
          if (EME(27.0)(10000)) return true;
          if (EME(22.0)(5000)) return true;
        } else {
          if (EME(109.0)(500000)) return true;
          if (EME(82.0)(375000)) return true;
          if (EME(55.0)(200000)) return true;
          if (EME(44.0)(120000)) return true;
          if (EME(33.0)(70000)) return true;
          if (EME(27.0)(40000)) return true;
          if (EME(22.0)(30000)) return true;
        }
      }
    } else if (network === 'GG') {
      if (!tournament['@turbo']) {
        //Синие
        if (MELE(1.0)(33.0)) return true;
        if (tournament['@currency'] === 'CNY' && MELE(1.0)(270.0)) return true;
        if (isKO) {
          if (MELEME(121.0)(150.0)(250000)) return true;
          if (MELEME(80.0)(120.0)(100000)) return true;
          if (MELEME(67.0)(79.0)(75000)) return true;
          if (MELEME(50.0)(66.0)(30000)) return true;
          if (MELEME(34.0)(49.0)(10000)) return true;
        } else {
          if (MELEME(121.0)(150.0)(400000)) return true;
          if (MELEME(80.0)(120.0)(150000)) return true;
          if (MELEME(67.0)(79.0)(100000)) return true;
          if (MELEME(50.0)(66.0)(60000)) return true;
          if (MELEME(34.0)(49.0)(40000)) return true;
        }
      } else if (!tournament['@rebuy']) {
        //Красные
        if (MELE(1.0)(20.0)) return true;
        if (isKO) {
          if (MELEME(121.0)(150.0)(500000)) return true;
          if (MELEME(80.0)(120.0)(250000)) return true;
          if (MELEME(67.0)(79.0)(150000)) return true;
          if (MELEME(50.0)(66.0)(100000)) return true;
          if (MELEME(34.0)(49.0)(50000)) return true;
          if (MELEME(21.0)(33.0)(10000)) return true;
        } else {
          if (MELEME(121.0)(150.0)(750000)) return true;
          if (MELEME(80.0)(120.0)(400000)) return true;
          if (MELEME(67.0)(79.0)(250000)) return true;
          if (MELEME(50.0)(66.0)(200000)) return true;
          if (MELEME(34.0)(49.0)(120000)) return true;
          if (MELEME(21.0)(33.0)(40000)) return true;
        }
      }
    } else if (network === 'PS.es') {
      if (!tournament['@turbo']) {
        //Синие
        if (tournament['@rebuy']) {
          if (MELE(1.0)(5.0)) return true;
        } else {
          if (MELE(1.0)(30.0)) return true;
        }

        if (isKO) {
          if (EME(250.0)(750000)) return true;
          if (EME(125.0)(200000)) return true;
          if (EME(100.0)(150000)) return true;
          if (EME(50.0)(20000)) return true;
        } else {
          if (EME(250.0)(1000000)) return true;
          if (EME(125.0)(300000)) return true;
          if (EME(100.0)(200000)) return true;
          if (EME(50.0)(50000)) return true;
        }
      } else if (!tournament['@rebuy']) {
        //Красные
        if (MELE(1.0)(10.0)) return true;
        if (isKO) {
          if (EME(30.0)(30000)) return true;
          if (EME(20.0)(0)) return true;
        } else {
          if (EME(30.0)(50000)) return true;
          if (EME(20.0)(20000)) return true;
        }
      }
    } else if (network === 'Party') {
      if (!tournament['@turbo']) {
        //Синие
        if (tournament['@rebuy']) {
          if (MELE(1.0)(11.0)) return true;
        } else {
          if (MELE(1.0)(33.0)) return true;
        }

        if (isKO) {
          if (EME(109.0)(100000)) return true;
          if (MELEME(77.0)(88.0)(60000)) return true;
          if (MELEME(55.0)(66.0)(30000)) return true;
          if (EME(44.0)(10000)) return true;
        } else {
          if (EME(109.0)(150000)) return true;
          if (MELEME(77.0)(88.0)(100000)) return true;
          if (MELEME(55.0)(66.0)(60000)) return true;
          if (EME(44.0)(40000)) return true;
        }
      } else if (!tournament['@rebuy']) {
        //Красные
        if (MELE(1.0)(11.0)) return true;
      }
    } else if (network === '888') {
      if (!tournament['@turbo']) {
        //Синие
        if (tournament['@rebuy']) {
          if (MELE(1.0)(6.0)) return true;
        } else {
          if (MELE(1.0)(33.0)) return true;
        }

        if (isKO) {
          if (EME(109.0)(100000)) return true;
          if (EME(88.0)(60000)) return true;
          if (EME(55.0)(20000)) return true;
          if (EME(44.0)(10000)) return true;
        } else {
          if (EME(109.0)(150000)) return true;
          if (EME(88.0)(100000)) return true;
          if (EME(55.0)(50000)) return true;
          if (EME(44.0)(30000)) return true;
        }
      } else if (!tournament['@rebuy']) {
        //Красные
        if (MELE(1.0)(12.0)) return true;
      }
    } else if (network === 'WPN' || network === 'Chico') {
      if (tournament['@rebuy'] && !tournament['@turbo']) {
        if (network === 'WPN') {
          if (MELE(1.0)(6.6)) return true;
        }
        if (network === 'Chico') {
          if (MELE(1.0)(12.0)) return true;
        }
      } else if (!tournament['@turbo']) {
        //Синие
        if (MELE(1.0)(33.0)) return true;
        if (isKO) {
          if (MELEME(121.0)(150.0)(250000)) return true;
          if (MELEME(80.0)(120.0)(100000)) return true;
          if (MELEME(67.0)(79.0)(75000)) return true;
          if (MELEME(50.0)(66.0)(30000)) return true;
          if (MELEME(34.0)(49.0)(10000)) return true;
        } else {
          if (MELEME(121.0)(150.0)(400000)) return true;
          if (MELEME(80.0)(120.0)(150000)) return true;
          if (MELEME(67.0)(79.0)(100000)) return true;
          if (MELEME(50.0)(66.0)(60000)) return true;
          if (MELEME(34.0)(49.0)(40000)) return true;
        }
      } else if (!tournament['@rebuy']) {
        //Красные
        if (MELE(1.0)(20.0)) return true;
        if (isKO) {
          if (MELEME(121.0)(150.0)(500000)) return true;
          if (MELEME(80.0)(120.0)(200000)) return true;
          if (MELEME(50.0)(66.0)(80000)) return true;
          if (MELEME(34.0)(49.0)(40000)) return true;
          if (MELEME(21.0)(33.0)(8000)) return true;
        } else {
          if (MELEME(121.0)(150.0)(750000)) return true;
          if (MELEME(80.0)(120.0)(300000)) return true;
          if (MELEME(50.0)(66.0)(150000)) return true;
          if (MELEME(34.0)(49.0)(100000)) return true;
          if (MELEME(21.0)(33.0)(32000)) return true;
        }
      }
    } else if (network === 'WNMX' || network === 'IP') {
      if (!tournament['@turbo']) {
        //Синие
        if (tournament['@rebuy']) {
          if (MELE(1.0)(5.0)) return true;
        } else {
          if (MELE(1.0)(30.0)) return true;
        }

        if (isKO) {
          if (EME(100.0)(80000)) return true;
          if (EME(50.0)(10000)) return true;
        } else {
          if (EME(100.0)(125000)) return true;
          if (EME(50.0)(15000)) return true;
        }
      } else if (tournament['@superturbo']) {
        if (MELE(1.0)(10.0)) return true;
      } else if (!tournament['@rebuy']) {
        //Красные
        if (MELE(1.0)(30.0)) return true;
        if (isKO) {
          if (EME(50.0)(50000)) return true;
          if (EME(30.0)(25000)) return true;
        } else {
          if (EME(50.0)(80000)) return true;
          if (EME(30.0)(50000)) return true;
        }
      }
    }
  }
  if (level === '7B') {
    if (network === 'PS.eu') {
      if (!tournament['@turbo']) {
        //Синие
        if (tournament['@rebuy']) {
          if (MELE(1.0)(5.5)) return true;
        } else {
          if (MELE(1.0)(27.0)) return true;
        }

        if (isKO) {
          if (EME(109.0)(150000)) return true;
          if (EME(82.0)(100000)) return true;
          if (EME(55.0)(50000)) return true;
          if (EME(44.0)(25000)) return true;
          if (EME(33.0)(6000)) return true;
        } else {
          if (EME(109.0)(250000)) return true;
          if (EME(82.0)(175000)) return true;
          if (EME(55.0)(100000)) return true;
          if (EME(44.0)(50000)) return true;
          if (EME(33.0)(20000)) return true;
        }
      } else if (!tournament['@rebuy']) {
        //Красные
        if (MELE(1.0)(11.0)) return true;
        if (isKO) {
          if (EME(55.0)(150000)) return true;
          if (EME(44.0)(90000)) return true;
          if (EME(33.0)(50000)) return true;
          if (EME(27.0)(40000)) return true;
          if (EME(22.0)(30000)) return true;
          if (EME(16.5)(20000)) return true;
        } else {
          if (EME(55.0)(250000)) return true;
          if (EME(44.0)(150000)) return true;
          if (EME(33.0)(90000)) return true;
          if (EME(27.0)(60000)) return true;
          if (EME(22.0)(40000)) return true;
          if (EME(16.5)(25000)) return true;
        }
      }
    } else if (network === 'GG') {
      if (!tournament['@turbo']) {
        //Синие
        if (MELE(1.0)(33.0)) return true;
        if (tournament['@currency'] === 'CNY' && MELE(1.0)(240.0)) return true;
        if (isKO) {
          if (MELEME(121.0)(150.0)(300000)) return true;
          if (MELEME(80.0)(120.0)(150000)) return true;
          if (MELEME(67.0)(79.0)(100000)) return true;
          if (MELEME(50.0)(66.0)(50000)) return true;
          if (MELEME(34.0)(49.0)(25000)) return true;
        } else {
          if (MELEME(121.0)(150.0)(500000)) return true;
          if (MELEME(80.0)(120.0)(250000)) return true;
          if (MELEME(67.0)(79.0)(175000)) return true;
          if (MELEME(50.0)(66.0)(100000)) return true;
          if (MELEME(34.0)(49.0)(50000)) return true;
        }
      } else if (!tournament['@rebuy']) {
        //Красные
        if (MELE(1.0)(13.0)) return true;
        if (isKO) {
          if (MELEME(67.0)(79.0)(200000)) return true;
          if (MELEME(50.0)(66.0)(150000)) return true;
          if (MELEME(34.0)(49.0)(90000)) return true;
          if (MELEME(21.0)(33.0)(40000)) return true;
          if (EME(15.0)(15000)) return true;
        } else {
          if (MELEME(67.0)(79.0)(300000)) return true;
          if (MELEME(50.0)(66.0)(250000)) return true;
          if (MELEME(34.0)(49.0)(150000)) return true;
          if (MELEME(21.0)(33.0)(60000)) return true;
          if (EME(15.0)(20000)) return true;
        }
      }
    } else if (network === 'PS.es') {
      if (!tournament['@turbo']) {
        //Синие
        if (tournament['@rebuy']) {
          if (MELE(1.0)(5.0)) return true;
        } else {
          if (MELE(1.0)(20.0)) return true;
        }

        if (isKO) {
          if (EME(250.0)(1000000)) return true;
          if (EME(125.0)(250000)) return true;
          if (EME(100.0)(200000)) return true;
          if (EME(50.0)(40000)) return true;
          if (EME(30.0)(5000)) return true;
        } else {
          if (EME(250.0)(1500000)) return true;
          if (EME(125.0)(400000)) return true;
          if (EME(100.0)(300000)) return true;
          if (EME(50.0)(75000)) return true;
          if (EME(30.0)(15000)) return true;
        }
      } else if (!tournament['@rebuy']) {
        //Красные
        if (MELE(1.0)(10.0)) return true;
        if (isKO) {
          if (EME(30.0)(50000)) return true;
          if (EME(20.0)(20000)) return true;
        } else {
          if (EME(30.0)(90000)) return true;
          if (EME(20.0)(30000)) return true;
        }
      }
    } else if (network === 'Party') {
      if (!tournament['@turbo']) {
        //Синие
        if (tournament['@rebuy']) {
          if (MELE(1.0)(11.0)) return true;
        } else {
          if (MELE(1.0)(33.0)) return true;
        }

        if (isKO) {
          if (EME(109.0)(150000)) return true;
          if (MELEME(77.0)(88.0)(100000)) return true;
          if (MELEME(55.0)(66.0)(50000)) return true;
          if (EME(44.0)(20000)) return true;
        } else {
          if (EME(109.0)(250000)) return true;
          if (MELEME(77.0)(88.0)(175000)) return true;
          if (MELEME(55.0)(66.0)(90000)) return true;
          if (EME(44.0)(50000)) return true;
        }
      } else if (!tournament['@rebuy']) {
        //Красные
        if (MELE(1.0)(11.0)) return true;
      }
    } else if (network === '888') {
      if (!tournament['@turbo']) {
        //Синие
        if (tournament['@rebuy']) {
          if (MELE(1.0)(6.0)) return true;
        } else {
          if (MELE(1.0)(33.0)) return true;
        }

        if (isKO) {
          if (EME(109.0)(150000)) return true;
          if (EME(88.0)(100000)) return true;
          if (EME(55.0)(30000)) return true;
          if (EME(44.0)(20000)) return true;
        } else {
          if (EME(109.0)(250000)) return true;
          if (EME(88.0)(150000)) return true;
          if (EME(55.0)(75000)) return true;
          if (EME(44.0)(50000)) return true;
        }
      } else if (!tournament['@rebuy']) {
        //Красные
        if (MELE(1.0)(12.0)) return true;
      }
    } else if (network === 'WPN' || network === 'Chico') {
      if (tournament['@rebuy'] && !tournament['@turbo']) {
        if (network === 'WPN') {
          if (MELE(1.0)(6.6)) return true;
        }
        if (network === 'Chico') {
          if (MELE(1.0)(12.0)) return true;
        }
      } else if (!tournament['@turbo']) {
        //Синие
        if (MELE(1.0)(33.0)) return true;
        if (isKO) {
          if (MELEME(121.0)(150.0)(300000)) return true;
          if (MELEME(80.0)(120.0)(150000)) return true;
          if (MELEME(67.0)(79.0)(100000)) return true;
          if (MELEME(50.0)(66.0)(50000)) return true;
          if (MELEME(34.0)(49.0)(25000)) return true;
        } else {
          if (MELEME(121.0)(150.0)(500000)) return true;
          if (MELEME(80.0)(120.0)(250000)) return true;
          if (MELEME(67.0)(79.0)(175000)) return true;
          if (MELEME(50.0)(66.0)(100000)) return true;
          if (MELEME(34.0)(49.0)(50000)) return true;
        }
      } else if (!tournament['@rebuy']) {
        //Красные
        if (MELE(1.0)(13.0)) return true;
        if (isKO) {
          if (MELEME(50.0)(66.0)(120000)) return true;
          if (MELEME(34.0)(49.0)(70000)) return true;
          if (MELEME(21.0)(33.0)(30000)) return true;
          if (EME(15.0)(12000)) return true;
        } else {
          if (MELEME(50.0)(66.0)(200000)) return true;
          if (MELEME(34.0)(49.0)(120000)) return true;
          if (MELEME(21.0)(33.0)(50000)) return true;
          if (EME(15.0)(15000)) return true;
        }
      }
    } else if (network === 'WNMX' || network === 'IP') {
      if (!tournament['@turbo']) {
        //Синие
        if (tournament['@rebuy']) {
          if (MELE(1.0)(5.0)) return true;
        } else {
          if (MELE(1.0)(30.0)) return true;
        }

        if (isKO) {
          if (EME(100.0)(100000)) return true;
          if (EME(50.0)(15000)) return true;
        } else {
          if (EME(100.0)(150000)) return true;
          if (EME(50.0)(20000)) return true;
        }
      } else if (tournament['@superturbo']) {
        if (MELE(1.0)(10.0)) return true;
      } else if (!tournament['@rebuy']) {
        //Красные
        if (MELE(1.0)(30.0)) return true;
        if (isKO) {
          if (EME(50.0)(40000)) return true;
          if (EME(30.0)(40000)) return true;
        } else {
          if (EME(50.0)(80000)) return true;
          if (EME(30.0)(80000)) return true;
        }
      }
    }
  }
  // if (level === "6A") {
  //   if (network === "PS.eu") {
  //     //Правила под sng, костыль
  //     if (tournament["@sng"]) return false;

  //     //Коричневые
  //     if (MELEI(1.0)(27.0)("hot")) return true;
  //     if (MELEI(1.0)(33.0)("big")) return true;
  //     if (MELEI(1.0)(44.0)("builder")) return true;
  //     if (EMEI(109.0)(150000)("mini super tuesday")) return true;
  //     if (EMEI(109.0)(100000)("mini thursday thrill")) return true;
  //     if (EMEI(33.0)(10000)("saturday speedway [turbo")) return true;
  //     if (MELE(1.0)(27.0) && tournament["@deepstack"]) return true;

  //     if (!tournament["@turbo"]) {
  //       //Синие
  //       if (tournament["@rebuy"]) {
  //         if (MELE(1.0)(5.0)) return true;
  //       } else {
  //         if (MELE(1.0)(27.0)) return true;
  //       }

  //       if (isKO) {
  //         if (EME(109.0)(200000)) return true;
  //         if (EME(82.0)(100000)) return true;
  //         if (EME(55.0)(50000)) return true;
  //         if (EME(44.0)(12000)) return true;
  //         if (EME(33.0)(6000)) return true;
  //       } else {
  //         if (EME(109.0)(300000)) return true;
  //         if (EME(82.0)(175000)) return true;
  //         if (EME(55.0)(90000)) return true;
  //         if (EME(44.0)(40000)) return true;
  //         if (EME(33.0)(20000)) return true;
  //       }
  //     } else if (!tournament["@rebuy"]) {
  //       //Красные
  //       if (MELE(1.0)(11.0)) return true;
  //       if (isKO) {
  //         if (EME(55.0)(150000)) return true;
  //         if (EME(44.0)(90000)) return true;
  //         if (EME(33.0)(50000)) return true;
  //         if (EME(27.0)(40000)) return true;
  //         if (EME(22.0)(30000)) return true;
  //         if (EME(16.5)(10000)) return true;
  //       } else {
  //         if (EME(55.0)(250000)) return true;
  //         if (EME(44.0)(150000)) return true;
  //         if (EME(33.0)(90000)) return true;
  //         if (EME(27.0)(60000)) return true;
  //         if (EME(22.0)(40000)) return true;
  //         if (EME(16.5)(20000)) return true;
  //       }
  //     }
  //   } else if (network === "GG") {
  //     //Турик в определнный день недели
  //     if (
  //       EI(50.0)("global million") &&
  //       (StartDay("Saturday") || StartDay("Sunday")) &&
  // (eI("[final ") || eI("[day"))
  //     )
  //       return true;
  //     if (
  //       EI(210)("zodiac bounty million") &&
  //       !(
  //         StartDay("Thursday") ||
  //         StartDay("Friday") ||
  //         StartDay("Saturday") ||
  //         StartDay("Sunday")
  //       ) ||
  // (EI(210)("zodiac bounty million") && !eI("stage"))
  //     )
  //       return false;

  //     //Коричневые
  //     if (EMEI(150)(250000)("ggmasters")) return true;

  //     if (!tournament["@turbo"]) {
  //       //Синие
  //       if (MELE(1.0)(27.5)) return true;
  //       if (tournament["@currency"] === "CNY" && MELE(1.0)(240.0)) return true;
  //       if (isKO) {
  //         if (MELEME(121.0)(150.0)(300000)) return true;
  //         if (MELEME(80.0)(120.0)(150000)) return true;
  //         if (MELEME(67.0)(79.0)(100000)) return true;
  //         if (MELEME(50.0)(66.0)(50000)) return true;
  //         if (MELEME(34.0)(49.0)(25000)) return true;
  //         if (MELEME(28.0)(33.0)(5000)) return true;
  //       } else {
  //         if (MELEME(121.0)(150.0)(500000)) return true;
  //         if (MELEME(80.0)(120.0)(250000)) return true;
  //         if (MELEME(67.0)(79.0)(175000)) return true;
  //         if (MELEME(50.0)(66.0)(90000)) return true;
  //         if (MELEME(34.0)(49.0)(50000)) return true;
  //         if (MELEME(28.0)(33.0)(12500)) return true;
  //       }
  //     } else if (!tournament["@rebuy"]) {
  //       //Красные
  //       if (MELE(1.0)(13.0)) return true;
  //       if (isKO) {
  //         if (MELEME(50.0)(66.0)(150000)) return true;
  //         if (MELEME(34.0)(49.0)(90000)) return true;
  //         if (MELEME(21.0)(33.0)(40000)) return true;
  //         if (EME(15.0)(15000)) return true;
  //       } else {
  //         if (MELEME(50.0)(66.0)(250000)) return true;
  //         if (MELEME(34.0)(49.0)(150000)) return true;
  //         if (MELEME(21.0)(33.0)(60000)) return true;
  //         if (EME(15.0)(20000)) return true;
  //       }
  //     }
  //   } else if (network === "PS.es") {
  //     if (!tournament["@turbo"]) {
  //       //Синие
  //       if (tournament["@rebuy"]) {
  //         if (MELE(1.0)(5.0)) return true;
  //       } else {
  //         if (MELE(1.0)(20.0)) return true;
  //       }

  //       if (isKO) {
  //         if (EME(250.0)(1000000)) return true;
  //         if (EME(125.0)(200000)) return true;
  //         if (EME(100.0)(150000)) return true;
  //         if (EME(50.0)(50000)) return true;
  //         if (EME(30.0)(5000)) return true;
  //       } else {
  //         if (EME(250.0)(1500000)) return true;
  //         if (EME(125.0)(300000)) return true;
  //         if (EME(100.0)(250000)) return true;
  //         if (EME(50.0)(90000)) return true;
  //         if (EME(30.0)(15000)) return true;
  //       }
  //     } else if (!tournament["@rebuy"]) {
  //       //Красные
  //       if (MELE(1.0)(10.0)) return true;
  //       if (isKO) {
  //         if (EME(30.0)(50000)) return true;
  //         if (EME(20.0)(20000)) return true;
  //       } else {
  //         if (EME(30.0)(90000)) return true;
  //         if (EME(20.0)(30000)) return true;
  //       }
  //     }
  //   } else if (network === "Party") {
  //     if (!tournament["@turbo"]) {
  //       //Синие
  //       if (tournament["@rebuy"]) {
  //         if (MELE(1.0)(5.0)) return true;
  //       } else {
  //         if (MELE(1.0)(33.0)) return true;
  //       }

  //       if (isKO) {
  //         if (EME(109.0)(150000)) return true;
  //         if (MELEME(77.0)(88.0)(100000)) return true;
  //         if (MELEME(55.0)(66.0)(50000)) return true;
  //         if (EME(44.0)(20000)) return true;
  //       } else {
  //         if (EME(109.0)(250000)) return true;
  //         if (MELEME(77.0)(88.0)(175000)) return true;
  //         if (MELEME(55.0)(66.0)(90000)) return true;
  //         if (EME(44.0)(50000)) return true;
  //       }
  //     } else if (!tournament["@rebuy"]) {
  //       //Красные
  //       if (MELE(1.0)(5.5)) return true;
  //     }
  //   } else if (network === "888") {
  //     if (!tournament["@turbo"]) {
  //       //Синие
  //       if (tournament["@rebuy"]) {
  //         if (MELE(1.0)(6.0)) return true;
  //       } else {
  //         if (MELE(1.0)(33.0)) return true;
  //       }

  //       if (isKO) {
  //         if (EME(109.0)(150000)) return true;
  //         if (EME(88.0)(100000)) return true;
  //         if (EME(55.0)(30000)) return true;
  //         if (EME(44.0)(20000)) return true;
  //       } else if (!tournament["@rebuy"]) {
  //         if (EME(109.0)(250000)) return true;
  //         if (EME(88.0)(175000)) return true;
  //         if (EME(55.0)(75000)) return true;
  //         if (EME(44.0)(50000)) return true;
  //       }
  //     } else {
  //       //Красные
  //       if (MELE(1.0)(12.0)) return true;
  //     }
  //   } else if (network === "WPN" || network === "Chico") {
  //     if (EMEI(109.0)(100000)("tiger gaming:$109 sunday major")) return true;

  //     if (!tournament["@turbo"]) {
  //       //Синие
  //       if (MELE(1.0)(27.0)) return true;
  //       if (isKO) {
  //         if (MELEME(121.0)(150.0)(300000)) return true;
  //         if (MELEME(80.0)(120.0)(120000)) return true;
  //         if (MELEME(67.0)(79.0)(80000)) return true;
  //         if (MELEME(50.0)(66.0)(40000)) return true;
  //         if (MELEME(34.0)(49.0)(20000)) return true;
  //         if (MELEME(28.0)(33.0)(4000)) return true;
  //       } else {
  //         if (MELEME(121.0)(150.0)(500000)) return true;
  //         if (MELEME(80.0)(120.0)(200000)) return true;
  //         if (MELEME(67.0)(79.0)(140000)) return true;
  //         if (MELEME(50.0)(66.0)(70000)) return true;
  //         if (MELEME(34.0)(49.0)(40000)) return true;
  //         if (MELEME(28.0)(33.0)(10000)) return true;
  //       }
  //     } else if (!tournament["@rebuy"]) {
  //       //Красные
  //       if (MELE(1.0)(13.0)) return true;
  //       if (isKO) {
  //         if (MELEME(50.0)(66.0)(120000)) return true;
  //         if (MELEME(34.0)(49.0)(70000)) return true;
  //         if (MELEME(21.0)(33.0)(30000)) return true;
  //         if (EME(15.0)(12000)) return true;
  //       } else {
  //         if (MELEME(50.0)(66.0)(200000)) return true;
  //         if (MELEME(34.0)(49.0)(120000)) return true;
  //         if (MELEME(21.0)(33.0)(50000)) return true;
  //         if (EME(15.0)(15000)) return true;
  //       }
  //     }
  //   } else if (network === "WNMX" || network === "IP") {
  //     if (!tournament["@turbo"]) {
  //       //Синие
  //       if (tournament["@rebuy"]) {
  //         if (MELE(1.0)(5.0)) return true;
  //       } else {
  //         if (MELE(1.0)(20.0)) return true;
  //       }

  //       if (isKO) {
  //         if (EME(100.0)(100000)) return true;
  //         if (EME(50.0)(20000)) return true;
  //       } else {
  //         if (EME(100.0)(150000)) return true;
  //         if (EME(50.0)(25000)) return true;
  //       }
  //     } else if (!tournament["@rebuy"]) {
  //       //Красные
  //       if (MELE(1.0)(20.0)) return true;
  //       if (isKO) {
  //         if (EME(50.0)(40000)) return true;
  //       } else {
  //         if (EME(50.0)(80000)) return true;
  //       }
  //     }
  //   }
  // }
  // if (level === "6B") {
  //   if (network === "PS.eu") {
  //     //Правила под sng, костыль
  //     if (tournament["@sng"]) return false;

  //     //Коричневые
  //     if (MELEI(1.0)(22.0)("hot")) return true;
  //     if (MELEI(1.0)(27.0)("big")) return true;
  //     if (MELEI(1.0)(44.0)("builder")) return true;
  //     if (EMEI(109.0)(250000)("mini thursday thrill")) return true;
  //     if (EMEI(33.0)(10000)("saturday speedway [turbo")) return true;
  //     if (MELE(1.0)(27.0) && tournament["@deepstack"]) return true;

  //     if (!tournament["@turbo"]) {
  //       //Синие
  //       if (tournament["@rebuy"]) {
  //         if (MELE(1.0)(5.5)) return true;
  //       } else {
  //         if (MELE(1.0)(22.0)) return true;
  //       }

  //       if (isKO) {
  //         if (EME(109.0)(350000)) return true;
  //         if (EME(82.0)(180000)) return true;
  //         if (EME(55.0)(100000)) return true;
  //         if (EME(44.0)(40000)) return true;
  //         if (EME(33.0)(10000)) return true;
  //         if (EME(27.0)(7500)) return true;
  //       } else {
  //         if (EME(109.0)(600000)) return true;
  //         if (EME(82.0)(320000)) return true;
  //         if (EME(55.0)(160000)) return true;
  //         if (EME(44.0)(80000)) return true;
  //         if (EME(33.0)(25000)) return true;
  //         if (EME(27.0)(15000)) return true;
  //       }
  //     } else if (!tournament["@rebuy"]) {
  //       //Красные
  //       if (MELE(1.0)(7.5)) return true;
  //       if (isKO) {
  //         if (EME(55.0)(200000)) return true;
  //         if (EME(44.0)(120000)) return true;
  //         if (EME(33.0)(75000)) return true;
  //         if (EME(27.0)(55000)) return true;
  //         if (EME(22.0)(35000)) return true;
  //         if (EME(16.5)(15000)) return true;
  //         if (EME(11.0)(5000)) return true;
  //       } else {
  //         if (EME(55.0)(400000)) return true;
  //         if (EME(44.0)(150000)) return true;
  //         if (EME(33.0)(90000)) return true;
  //         if (EME(27.0)(62000)) return true;
  //         if (EME(22.0)(50000)) return true;
  //         if (EME(16.5)(25000)) return true;
  //         if (EME(11.0)(10000)) return true;
  //       }
  //     }
  //   } else if (network === "GG") {
  //     //Турик в определнный день недели
  //     if (EI(50.0)("global million") && StartDay("Sunday") &&
  // (eI("[final ") || eI("[day"))) return true;
  // if (
  //   (EI(210)("zodiac bounty million") &&
  //     !(StartDay("Friday") || StartDay("Saturday") || StartDay("Sunday"))) ||
  //   (EI(210)("zodiac bounty million") && !eI("stage"))
  // )
  //   return false;

  //     //Коричневые
  //     if (EMEI(150)(400000)("ggmasters")) return true;

  //     if (!tournament["@turbo"]) {
  //       //Синие
  //       if (MELE(1.0)(22.0)) return true;
  //       if (tournament["@currency"] === "CNY" && MELE(1.0)(210.0)) return true;
  //       if (isKO) {
  //         if (MELEME(80.0)(120.0)(300000)) return true;
  //         if (MELEME(67.0)(79.0)(175000)) return true;
  //         if (MELEME(50.0)(66.0)(100000)) return true;
  //         if (MELEME(34.0)(49.0)(40000)) return true;
  //         if (MELEME(25.0)(33.0)(7500)) return true;
  //       } else {
  //         if (MELEME(80.0)(120.0)(500000)) return true;
  //         if (MELEME(67.0)(79.0)(375000)) return true;
  //         if (MELEME(50.0)(66.0)(150000)) return true;
  //         if (MELEME(34.0)(49.0)(80000)) return true;
  //         if (MELEME(25.0)(33.0)(15000)) return true;
  //       }
  //     } else if (!tournament["@rebuy"]) {
  //       //Красные
  //       if (MELE(1.0)(10.5)) return true;
  //       if (isKO) {
  //         if (MELEME(50.0)(66.0)(200000)) return true;
  //         if (MELEME(34.0)(49.0)(120000)) return true;
  //         if (MELEME(21.0)(33.0)(50000)) return true;
  //         if (EME(15.0)(15000)) return true;
  //         if (MELEME(10.75)(13.0)(5000)) return true;
  //       } else {
  //         if (MELEME(50.0)(66.0)(400000)) return true;
  //         if (MELEME(34.0)(49.0)(150000)) return true;
  //         if (MELEME(21.0)(33.0)(62000)) return true;
  //         if (EME(15.0)(25000)) return true;
  //         if (MELEME(10.75)(13.0)(10000)) return true;
  //       }
  //     }
  //   } else if (network === "PS.es") {
  //     if (!tournament["@turbo"]) {
  //       //Синие
  //       if (tournament["@rebuy"]) {
  //         if (MELE(1.0)(5.0)) return true;
  //       } else {
  //         if (MELE(1.0)(20.0)) return true;
  //       }

  //       if (isKO) {
  //         if (EME(125.0)(250000)) return true;
  //         if (EME(100.0)(250000)) return true;
  //         if (EME(50.0)(100000)) return true;
  //         if (EME(30.0)(10000)) return true;
  //       } else {
  //         if (EME(125.0)(500000)) return true;
  //         if (EME(100.0)(400000)) return true;
  //         if (EME(50.0)(150000)) return true;
  //         if (EME(30.0)(25000)) return true;
  //       }
  //     } else if (!tournament["@rebuy"]) {
  //       //Красные
  //       if (MELE(1.0)(10.0)) return true;
  //       if (isKO) {
  //         if (EME(30.0)(75000)) return true;
  //         if (EME(20.0)(30000)) return true;
  //       } else {
  //         if (EME(30.0)(90000)) return true;
  //         if (EME(20.0)(50000)) return true;
  //       }
  //     }
  //   } else if (network === "Party") {
  //     if (!tournament["@turbo"]) {
  //       //Синие
  //       if (tournament["@rebuy"]) {
  //         if (MELE(1.0)(5.0)) return true;
  //       } else {
  //         if (MELE(1.0)(27.0)) return true;
  //       }
  //       if (isKO) {
  //         if (EME(109.0)(350000)) return true;
  //         if (MELEME(77.0)(88.0)(180000)) return true;
  //         if (MELEME(55.0)(66.0)(100000)) return true;
  //         if (EME(44.0)(30000)) return true;
  //         if (EME(33.0)(5000)) return true;
  //       } else {
  //         if (EME(109.0)(600000)) return true;
  //         if (MELEME(77.0)(88.0)(320000)) return true;
  //         if (MELEME(55.0)(66.0)(160000)) return true;
  //         if (EME(44.0)(75000)) return true;
  //         if (EME(33.0)(25000)) return true;
  //       }
  //     } else if (!tournament["@rebuy"]) {
  //       //Красные
  //       if (MELE(1.0)(5.5)) return true;
  //     }
  //   } else if (network === "888") {
  //     if (!tournament["@turbo"]) {
  //       //Синие
  //       if (tournament["@rebuy"]) {
  //         if (MELE(1.0)(6.0)) return true;
  //       } else {
  //         if (MELE(1.0)(25.0)) return true;
  //       }
  //       if (isKO) {
  //         if (EME(109.0)(350000)) return true;
  //         if (EME(88.0)(180000)) return true;
  //         if (EME(55.0)(40000)) return true;
  //         if (EME(44.0)(30000)) return true;
  //         if (MELEME(30.0)(33.0)(5000)) return true;
  //       } else {
  //         if (EME(109.0)(600000)) return true;
  //         if (EME(88.0)(320000)) return true;
  //         if (EME(55.0)(100000)) return true;
  //         if (EME(44.0)(75000)) return true;
  //         if (MELEME(30.0)(33.0)(10000)) return true;
  //       }
  //     } else if (!tournament["@rebuy"]) {
  //       //Красные
  //       if (MELE(1.0)(12.0)) return true;
  //     }
  //   } else if (network === "WPN" || network === "Chico") {
  //     if (!tournament["@turbo"]) {
  //       if (EMEI(109.0)(150000)("tiger gaming:$109 sunday major")) return true;

  //       //Синие
  //       if (MELE(1.0)(22.0)) return true;
  //       if (isKO) {
  //         if (MELEME(80.0)(120.0)(250000)) return true;
  //         if (MELEME(67.0)(79.0)(140000)) return true;
  //         if (MELEME(50.0)(66.0)(80000)) return true;
  //         if (MELEME(34.0)(49.0)(32000)) return true;
  //         if (MELEME(25.0)(33.0)(6000)) return true;
  //       } else {
  //         if (MELEME(80.0)(120.0)(400000)) return true;
  //         if (MELEME(67.0)(79.0)(300000)) return true;
  //         if (MELEME(50.0)(66.0)(120000)) return true;
  //         if (MELEME(34.0)(49.0)(65000)) return true;
  //         if (MELEME(25.0)(33.0)(12000)) return true;
  //       }
  //     } else if (!tournament["@rebuy"]) {
  //       //Красные
  //       if (MELE(1.0)(10.5)) return true;
  //       if (isKO) {
  //         if (MELEME(50.0)(66.0)(150000)) return true;
  //         if (MELEME(34.0)(49.0)(100000)) return true;
  //         if (MELEME(21.0)(33.0)(40000)) return true;
  //         if (EME(15.0)(12000)) return true;
  //         if (MELEME(10.75)(13.0)(4000)) return true;
  //       } else {
  //         if (MELEME(50.0)(66.0)(300000)) return true;
  //         if (MELEME(34.0)(49.0)(120000)) return true;
  //         if (MELEME(21.0)(33.0)(50000)) return true;
  //         if (EME(15.0)(20000)) return true;
  //         if (MELEME(10.75)(13.0)(8000)) return true;
  //       }
  //     }
  //   } else if (network === "WNMX" || network === "IP") {
  //     if (!tournament["@turbo"]) {
  //       //Синие
  //       if (tournament["@rebuy"]) {
  //         if (MELE(1.0)(5.0)) return true;
  //       } else {
  //         if (MELE(1.0)(20.0)) return true;
  //       }

  //       if (isKO) {
  //         if (EME(100.0)(125000)) return true;
  //         if (EME(50.0)(25000)) return true;
  //       } else {
  //         if (EME(100.0)(200000)) return true;
  //         if (EME(50.0)(30000)) return true;
  //       }
  //     } else if (!tournament["@rebuy"]) {
  //       //Красные
  //       if (MELE(1.0)(20.0)) return true;
  //       if (isKO) {
  //         if (EME(50.0)(50000)) return true;
  //       } else {
  //         if (EME(50.0)(100000)) return true;
  //       }
  //     }
  //   }
  // }
  if (level === '16A' || level === '16B') {
    return true;
  }
  return false;
};

module.exports = {
  filterLevelByRules,
};
