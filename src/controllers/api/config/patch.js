const { getConfig, saveConfig } = require("../../../store/config/utils");

module.exports = async (req, res) => {
    const { alias, level, effmu, network } = req.body;

    if (!network) {
        return res.status(400).send('Network is required parameter');
    }

    const config = await getConfig();

    if (!config[alias]) {
        return res.status(404).send('No such alias');
    }
    if (!config[alias][network]) {
        return res.status(400).send('Alias does not have this network');
    }

    if (level) {
        config[alias][network].level = level;
    }
    if (effmu) {
        config[alias][network].effmu = effmu;
    }

    await saveConfig(config);

    res.status(200).send();
}
