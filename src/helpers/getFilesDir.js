const fs = require("fs");

function getFilesDir(dir, prevArrayFileNames) {
  const arrayFileNames = prevArrayFileNames || [];
  const allFiles = fs.readdirSync(dir);

  for (let i = 0; i < allFiles.length; i++) {
    const name = `${dir}/${allFiles[i]}`;

    if (fs.statSync(name).isDirectory()) {
      getFilesDir(name, arrayFileNames);
    } else {
      if(name.includes('.json')) {
        arrayFileNames.push(name);
      }
    }
  }

  return arrayFileNames;
}

module.exports = { getFilesDir };
