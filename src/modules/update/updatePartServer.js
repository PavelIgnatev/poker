
const { updtateAllCopies } = require("./updateAllCopies");
const { collectionStatistics } = require("../collection/collectionStatistics");
const { updateTournaments } = require("./updateTournaments");

const updatePartServer = async () => {
  // Добавление нового дня
  try {
    console.log(`Начал обновление папки days`);
    await updateTournaments();
  } catch (error) {
    console.log("Ошибка при добавлении нового дня на сервер: ", error);
  }

  // Отправка писем
  try {
    console.log("Начинаю отправлять письма");
    await collectionStatistics();
  } catch (error) {
    console.log("Ошибка при отправке писем: ", error);
  }

  // Обновление копий
  try {
    await updtateAllCopies();
  } catch (error) {
    console.log("Ошибка при сохранении всех копий: ", error);
  }
};

module.exports = { updatePartServer };
