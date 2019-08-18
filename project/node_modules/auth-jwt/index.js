const verify = require("./lib/verify");

module.exports = {
    verify: verify.verify,
    getToken: verify.getToken
};
