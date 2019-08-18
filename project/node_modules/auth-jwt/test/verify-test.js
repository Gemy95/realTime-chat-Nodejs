let auth = require('../index');
let assert = require('assert');
let expect = require('chai').expect;

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIifQ.yPmf5QFV26W-3ldVCrsvRdnecy7QjA0fnCWCDLDZ-M4";
const secretKey = 'xxx';

describe('Verify', () => {

    it('needs to be false to work', () => {

        let req = {
            headers : {}
        };

        auth.verify(req, null)
            .then(() => {
                throw new Error("Retornou verdadeiro");
            })
            .catch((e)=>{
                expect(e.name).to.equal("Error");
            })

    });

    it('needs to be true to work', () => {

        let req = {
            headers : {
                authorization : 'JWT ' + token
            }
        };

        return auth.verify(req, secretKey)
            .then((retorno) => {
                if (retorno.foo !== 'bar'){
                    throw new Error("Retornou valor errado");
                }
            })
            .catch((e)=>{
                throw e;
            })

    });

    it('needs to be JWT or Bearer to work - JWT', () => {

        let req = {
            headers : {
                authorization : 'jwt ' + token
            }
        };

        return auth.verify(req, secretKey)
            .then(() => {
                throw new Error("Valor errado retornado!")
            })
            .catch((e)=>{
                assert.equal(e.name,'Error');
            })

    });

    it('needs to be JWT or Bearer to work - Bearer', function() {

        let req = {
            headers : {
                authorization : 'Bearer ' + token
            }
        };

        return auth.verify(req, secretKey)
            .then((retorno)=>{
                if (retorno.foo !== 'bar'){
                    throw new Error("Retornou valor errado");
                }
            })
            .catch((e)=>{
                throw e;
            })

    });
    
    it('needs to be true to work with getToken', () => {
        
        let req = {
            headers : {
                authorization : 'JWT ' + token
            }
        };
        
        return auth.getToken(req)
            .then((retorno)=>{
                if (retorno !== token){
                    throw new Error("Retornou valor errado");
                }
            })
            .catch((e)=>{
                throw e;
            })
        
    });

});