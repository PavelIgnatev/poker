const getFullUrl = (req) => {
    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;

    return `${protocol}://${host}${url}`;
}

const grayBadge = (string) => `\x1b[100m\x1b[97m  ${string}  \x1b[0m`;
const redBadge = (string) => `\x1b[101m\x1b[97m  ${string}  \x1b[0m`;
const greenBadge = (string) => `\x1b[102m\x1b[97m  ${string}  \x1b[0m`;
const yellowBadge = (string) => `\x1b[103m\x1b[97m  ${string}  \x1b[0m`;

const statusWithBadge = (statusCode) => {
    const code = Number(statusCode);

    if (isNaN(code) || code < 200) {
        return grayBadge(statusCode);
    } else if (code < 300) {
        return greenBadge(statusCode);
    } else if (code < 400) {
        return grayBadge(statusCode);
    } else if (code < 500) {
        return yellowBadge(statusCode);
    }
    return redBadge(statusCode);
}

module.exports = (req, res, next) => {
    const method = grayBadge(req.method.toUpperCase());
    const status = statusWithBadge('PENDING');
    const fullUrl = getFullUrl(req);

    console.log('\n', method, status, fullUrl);

    res.on('finish', () => {
        console.log('\n', method, statusWithBadge(res.statusCode), fullUrl, `${res.get('Content-Length') || 0} bytes sent`);
    });

    next();
}
