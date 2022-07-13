const { getConfig } = require("../../../store/config/utils");

module.exports = async (req, res) => {
    const { alias } = req.body;

    const config = await getConfig();

    if (!config[alias]) {
        return res.status(404).send('No such alias');
    }

    res.status(200).send(config[alias]);
}
