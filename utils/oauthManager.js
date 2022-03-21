const qs = require('qs');
const fetch = require('node-fetch');

class Google {
    constructor(code) {
        this.code = code;
        this.url = 'https://accounts.google.com/o/oauth2/token';
        this.clientID = '679411229122-e2n0ef01bj76cbje53oqmvjhehfjhn5o.apps.googleusercontent.com';
        this.clientSecret = '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';
        this.redirectUri = 'postmessage';
        this.userInfoUrl = 'https://www.googleapis.com/oauth2/v1/userinfo';
    }
}

module.exports = {
    getAccessToken: async (options) => {
        try {
            return await fetch(options.url, {
                method: 'POST',
                headers: {
                    'content-type':'application/x-www-form-urlencoded;charset=utf-8'
                },
                body: qs.stringify({
                    grant_type: 'authorization_code',
                    client_id: options.clientID,
                    client_secret: options.clientSecret,
                    redirect_uri: options.redirectUri,
                    code: options.code,
                }),
            }).then(res => res.json());
        } catch(e) {
            // logger.info("error", e);
            console.log('first winston error');
        }
    },    
    getUserInfo: async (url, access_token) => {
        try {
            return await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'Authorization': `Bearer ${access_token}`
                }
            }).then(res => res.json());
        }catch(e) {
            // logger.info("error", e);
            console.log('second error');
        }
    },    
    getOption: (coperation, code)=> {
        switch(coperation) {
            case 'google':
                return new Google(code);
                break;
            case 'google':
                // return new Google(code);
                break;
            case 'naver':
                // return new Naver(code);
            break;
        }
    }
}