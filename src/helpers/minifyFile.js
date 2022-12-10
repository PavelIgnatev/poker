const axios = require('axios');
const qs = require('qs');

const minifyFile = (input) => {
    const data = { input };
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: 'https://www.toptal.com/developers/javascript-minifier/api/raw',
    };

    return axios(options).then(({ data }) => {
        return data;
    });
}

module.exports = { minifyFile }