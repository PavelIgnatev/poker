const getTournaments = require("./getTournaments");
const getFormingAbility2 = require("./getFormingAbility2");
const getAbility2 = require("./getAbility2");
const getAlias = require("./getAlias");
const getPreview = require("./getPreview");
const getPreviewRules = require("./getPreviewRules");
const postSettings = require("./postSettings");
const postAlias = require("./postAlias");

const config = require("./config");
const aliases = require("./aliases");
const password = require("./password");

module.exports = {
  getTournaments,
  getFormingAbility2,
  getAbility2,
  getAlias,
  getPreviewRules,
  getPreview,
  postSettings,
  postAlias,

  config,
  aliases,
  password,
};
