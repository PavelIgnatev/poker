const fs = require('fs');

async function updateCopies(value, filename) {
  const currentTime = new Date(Date.now());
  const year = currentTime.getFullYear();
  const month = currentTime.getMonth() + 1;
  const day = currentTime.getDate();
  const date = `${year}-${month}-${day}`;

  fs.mkdir(`src/store/copies/${date}`, async (err) => {
    fs.writeFile(`src/store/copies/${date}/${filename}`, JSON.stringify(value), () => {});
  });
}

module.exports = { updateCopies };
