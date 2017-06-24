const pathToRegexp = require('path-to-regexp');
const path = require('path');
const { cacheDir } = require('./paths');

const testMatch = (url) => (pathToRegexp('/dll/:bundleName.js').exec(url) || [])[1];

const middleware = (dllSettings) => {
  return (req, res, next) => {
    const bundleName = testMatch(req.url);

    if (!dllSettings.entry[bundleName]) {
      return next();
    }

    res.sendFile(path.resolve(cacheDir, `${bundleName}.bundle.js`));
  };
};

module.exports = middleware;