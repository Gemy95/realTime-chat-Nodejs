let regex = /(\S+)\s+(\S+)/

module.exports = {
    parse: (headers) => {
        try {
            if (typeof headers !== 'string') {
                return null;
            }
            let opcoes = headers.match(regex);
            return opcoes && {scheme: opcoes[1], value: opcoes[2]}

        } catch(e){
            throw e;
        }
    }
};
