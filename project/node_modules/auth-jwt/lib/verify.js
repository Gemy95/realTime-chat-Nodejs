const parse = require("./parser_header");
const jwt = require("jwt-simple");

const AUTH_HEADER = ["authorization", "Authorization"];

/**
 *
 * @param req
 * @returns {Promise}
 */
const getToken = (req) => {
    return new Promise((resolve, reject) => {
        let token = null;
        try {
            AUTH_HEADER.forEach((t) => {
                if (req.headers[t]) {
                    
                    let auth_params = parse.parse(req.headers[t]);
                    if (auth_params) {
                        token = auth_params.value;
                    }
                    
                    if (
                        ( (auth_params.scheme !== 'JWT' && auth_params.scheme !== 'Bearer') || !token)
                    ) {
                        return reject(new Error("Invalid authorization header"));
                    }
                    
                    resolve(token);
                    
                }
            });
            reject(new Error("Undefined authorization header"));
        } catch (e) {
            reject(e);
        }
    });
};

/**
 *
 * @param req
 * @param secret
 * @returns {Promise}
 */
const verify = (req, secret) => {
    return new Promise((resolve, reject) => {
        getToken(req)
            .then((token) => {
                req.token = token;
                return resolve(jwt.decode(token, secret));
            })
            .catch((err) => reject(err));
    });
};

module.exports = {
    verify, getToken
};