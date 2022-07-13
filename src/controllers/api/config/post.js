const { getConfig, saveConfig } = require("../../../store/config/utils");

const { networks } = require("../../../constants");

module.exports = async (req, res) => {
    const { alias, level = 16, effmu = 'A' } = req.body;

    const config = await getConfig();

    if (config[alias]) {
        return res.status(400).send('Alias is already in use');
    }

    config[alias] = {};
    networks.forEach((network) => {
       config[alias][network] = { level, effmu };
    });

    await saveConfig(config);

    res.status(201).send();
}
