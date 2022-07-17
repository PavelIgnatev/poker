const { updateRules } = require('../../modules/update/updateRules');
const { readFile, writeFile } = require('../../utils/promisify');

module.exports = async (req, res) => {
  console.log('Начинаю обновлять настройки');
  try {
    let { network, level, currency, bid, status, name, ability, ability2 } = req.body;
    let prevAbility = JSON.parse(await readFile('src/store/rules/preview.json'));

    if (req.body.method === 'add') {
      if (!prevAbility[level]) prevAbility[level] = [];

      const previw = {
        network,
        level,
        currency,
        bid,
        status,
        name: name + (!name.includes('(A2') ? `(A2: ${ability2})` : ''),
        ability,
      };

      try {
        prevAbility[level].push(previw);
        console.log('Новое правило ' + JSON.stringify(previw) + ' добавлено');
      } catch (error) {
        console.log(error);
        console.log('Новое правило ' + JSON.stringify(previw) + ' добавлено не было');
      }

      await writeFile('src/store/rules/preview.json', JSON.stringify(prevAbility));
    } else {
      try {
        prevAbility[level] = prevAbility[level].filter((el) => {
          return !(
            el.network === network &&
            el.level === level &&
            el.currency === currency &&
            el.bid === bid &&
            el.status === status &&
            el.name == name + (!name.includes('(A2') ? `(A2: ${ability2})` : '') &&
            el.ability == ability
          );
        });
        console.log('Правило ' + JSON.stringify(req.body) + ' удалено');
      } catch (error) {
        console.log('Правило ' + JSON.stringify(req.body) + ' удалено не было, произошла ошибка');
        console.log(error);
      }

      await writeFile('src/store/rules/preview.json', JSON.stringify(prevAbility));
    }
    console.log('Начал обновлять config правил');
    updateRules(prevAbility);
    res.json(req.body);
  } catch (error) {
    res.status(500).json({});
    console.log(error);
  }
};
