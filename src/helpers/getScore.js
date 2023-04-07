const mysql = require('mysql');
const { getNetwork } = require('./getNetwork');

const connection = mysql.createConnection({
  host: 'vps27054.inmotionhosting.com',
  user: 'pocarr5_GameSelectTool',
  password: 'ukO4oqdtx8=:%IVm*jzI',
  database: 'pocarr5_GameSelectTool'
});

const networks = {}

const getScore = () => {
  console.log("Начинаю получать score")
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err);
      }

      const sqlQuery = 'SELECT * FROM CombinedTournamentData';

      connection.query(sqlQuery, (error, results, fields) => {
        if (error) {
          reject(error);
        }

        results.forEach(tournament => {
          const network = getNetwork(tournament.Network)

          if(networks[network]) {
            networks[network].push(tournament)
          }
          else {
            networks[network] = [tournament]
          }
        });

        connection.end((err) => {
          if (err) {
            reject(err);
          }

          console.log("Закончил получать score")
          resolve(networks);
        });
      });
    });
  });
}



module.exports = { getScore }