# auth-jwt

> An authentication module using JWT

## Install

    npm install auth-jwt

## Usage

### Example

auth.js

```js
const auth = require('auth-jwt');

let auth = (req, res, next) => {
    auth.verify(req, 'secretKey')
        .then((user)=>{
            req.user = user;
            next()
        })
        .catch((e) => res.sendStatus(401) )
}

app.get('/user', auth, (req, res) => {
    ...
})
```

routes.js
```js
app.get('/user', auth, (req, res) => {
    ...
})
```

### Include the JWT or Bearer in requests

Include the token created by JWT in the request header

    Authorization: JWT JSON_WEB_TOKEN_STRING.....

or 

    Authorization: Bearer JSON_WEB_TOKEN_STRING.....


### Get token in requests

```js
const auth = require('auth-jwt');

let auth = (req, res, next) => {
    auth.getToken(req)
        .then((user)=>{
            console.log(token);
        })
        .catch((e) => console.log(e) )
}

```

### Async / Await

```js
const auth = require('auth-jwt');

module.exports = async (req, res, next) => {
    try {
        req.user = await auth.verify(req, 'secretKey');
        next();
    } catch {
        res.status(401).json({code: 401});
    }
}

```

## Tests

    npm install
    npm test

## License

The [MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2016 Wallace Silva