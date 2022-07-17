const { writeFile } = require('../../utils/promisify');

const createdGap = async () => {
  const result = {
    '7A': {
      'PS.eu': null,
      Party: {
        normal: '55.00-66.99;77.00-88.99',
      },
      888: null,
      'Ps.es': null,
      GG: {
        normal: '34.00-49.99;50.00-66.99;67.00-79.99;80.00-120.99;121.00-150.99',
        turbo: '21.00-33.99;34.00-49.99;50.00-66.99;80.00-120.99;121.00-150.99',
      },
      WNMX: null,
      WPN: {
        normal: '34.00-49.99;50.00-66.99;67.00-79.99;80.00-120.99;121.00-150.99',
        turbo: '21.00-33.99;34.00-49.99;50.00-66.99;80.00-120.99;121.00-150.99',
      },
    },
    '7B': {
      'PS.eu': null,
      Party: {
        normal: '55.00-66.99;77.00-88.99',
      },
      888: null,
      'Ps.es': null,
      GG: {
        normal: '34.00-49.99;50.00-66.99;67.00-79.99;80.00-120.99;121.00-150.99',
        turbo: '21.00-33.99;34.00-49.99;50.00-66.99',
      },
      WNMX: null,
      WPN: {
        normal: '34.00-49.99;50.00-66.99;67.00-79.99;80.00-120.99;121.00-150.99',
        turbo: '21.00-33.99;34.00-49.99;50.00-66.99',
      },
    },
    // "6A": {
    //   "PS.eu": null,
    //   Party: {
    //     normal: "55.00-66.99;77.00-88.99",
    //   },
    //   888: null,
    //   "Ps.es": null,
    //   GG: {
    //     normal:
    //       "28.00-33.99;34.00-49.99;50.00-66.99;67.00-79.99;80.00-120.99;121.00-150.99",
    //     turbo: "21.00-33.99;34.00-49.99;50.00-66.99",
    //   },
    //   WNMX: null,
    //   WPN: {
    //     normal:
    //       "28.00-33.99;34.00-49.99;50.00-66.99;67.00-79.99;80.00-120.99;121.00-150.99",
    //     turbo: "21.00-33.99;34.00-49.99;50.00-66.99",
    //   },
    // },
    // "6B": {
    //   "PS.eu": null,
    //   Party: {
    //     normal: "55.00-66.99;77.00-88.99",
    //   },
    //   888: "30.00-33.99",
    //   "Ps.es": null,
    //   GG: {
    //     normal: "25.00-33.99;34.00-49.99;50.00-66.99;67.00-79.99;80.00-120.99",
    //     turbo: "10.75-13.99;21.00-33.99;34.00-49.99;50.00-66.99",
    //   },
    //   WNMX: null,
    //   WPN: {
    //     normal: "25.00-33.99;34.00-49.99;50.00-66.99;67.00-79.99;80.00-120.99",
    //     turbo: "10.75-13.99;21.00-33.99;34.00-49.99;50.00-66.99",
    //   },
    // },
  };

  Object.keys(result).forEach((level) => {
    Object.keys(result[level]).forEach((network) => {
      if (result[level][network]) {
        Object.keys(result[level][network]).forEach((status) => {
          const statuss = result[level][network][status].split(';');
          const realFake = {};
          statuss.forEach((gap) => {
            const fake = {};
            const gaps = gap.split('-');
            let start = Number(gaps[0]);
            const end = Number(gaps[1]);
            while (start < end) {
              let i = 0;
              while (i < 100) {
                fake[`${start}.${String(i).padStart(2, '0')}`] = gap;
                i += 1;
              }
              start++;
            }
            Object.assign(realFake, fake);
          });
          result[level][network][status] = realFake;
        });
      }
    });
  });

  await writeFile('src/store/gaps/gap.json', JSON.stringify(result));
};

module.exports = { createdGap };
