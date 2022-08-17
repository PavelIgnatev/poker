const getTournaments = require("./getTournaments");
const getFormingAbility2 = require("./getFormingAbility2");
const getAbility2 = require("./getAbility2");
const getPreviewRules = require("./getPreviewRules");
const postSettings = require("./postSettings");
const postAdminPassword = require("./postAdminPassword");

const sample = require("./sample");
const offpeak = require("./offpeak");
const config = require("./config");
const aliases = require("./aliases");
const rules = require("./rules");

module.exports = {
  getTournaments,
  getFormingAbility2,
  getAbility2,
  getPreviewRules,
  postSettings,
  postAdminPassword,

  sample,
  config,
  rules,
  offpeak,
  aliases,
};
