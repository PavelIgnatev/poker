const getTournaments = require('./getTournaments');
const getFormingAbility2 = require('./getFormingAbility2');
const getAbility2 = require('./getAbility2');
const getAlias = require('./getAlias');
const getPreview = require('./getPreview');
const getPreviewRules = require('./getPreviewRules');
const postSettings = require('./postSettings');
const postAlias = require('./postAlias');
const postPassword = require('./postPassword');

const config = require('./config');

module.exports = {
  getTournaments,
  getFormingAbility2,
  getAbility2,
  getAlias,
  getPreviewRules,
  getPreview,
  postSettings,
  postAlias,
  postPassword,

  config,
};
