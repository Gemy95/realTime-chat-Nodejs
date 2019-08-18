'use strict';

const _ = require('lodash');
const OAuth2Strategy = require('passport-oauth2');

const DEFAULTS = {
    authorizationURL: 'https://stepic.org/oauth2/authorize/',
    tokenURL: 'https://stepic.org/oauth2/token/',
    profileURL: 'https://stepic.org/api/stepics/1'
};

class Strategy extends OAuth2Strategy {
    constructor(options, verify) {
        _.defaults(options, DEFAULTS);
        super(options, verify);
        this.name = 'stepic';
        this._options = options;
    }
    authenticate(req, options) {
        if (req.query && req.query.error_code && !req.query.error) {
            return this.error(`Authorization error: ${req.query.error_code}`);
        }
        super.authenticate(req, options);
    }
    userProfile(accessToken, done) {
        this._oauth2.get(this._options.profileURL, accessToken, (err, body) => {
            if (err) {
                return done(err);
            }
            try {
                let parsed = JSON.parse(body);
                done(null, parsed.profiles[0]);
            } catch (e) {
                done(e);
            }
        });
    }
}

module.exports = Strategy;
