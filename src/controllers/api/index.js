const getTournaments = require("./getTournaments");
const getFormingAbility2 = require("./getFormingAbility2");
const getAbility2 = require("./getAbility2");
const getPreview = require("./getPreview");
const getPreviewRules = require("./getPreviewRules");
const postSettings = require("./postSettings");
const postAdminPassword = require("./postAdminPassword");

const sample = require("./sample");
const config = require("./config");
const aliases = require("./aliases");

module.exports = {
  getTournaments,
  getFormingAbility2,
  getAbility2,
  getPreviewRules,
  getPreview,
  postSettings,
  postAdminPassword,

  sample,
  config,
  aliases,
};
