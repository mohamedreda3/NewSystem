const jwt = require('jsonwebtoken');

module.exports = class Jwt {
    #pKey = '';
    #refreshKey = '';
    #accessKey = '';
    #accessTokenExpireDate = null;
    #refreshTokenExpireDate = null;
    #dateNow = new Date().valueOf();
    constructor() {
        this.#refreshKey = '2a35a2a311c928a8976d49aad0f2760b971807e6';
        this.#accessKey = '9ce2716c51a245017fd5b8c0e8632e8a4f191dd4';
        this.#pKey = '527544a3d33163b48b05c6ca0e52571b';
        this.#refreshTokenExpireDate = "365d";
        this.#accessTokenExpireDate = "5d";
    }

    exportAccessToken(user) {
        return jwt.sign({ user }, this.#accessKey, { expiresIn: this.#accessTokenExpireDate });
    }

    decodeAccessToken(token) {
        return jwt.decode(token, { complete: false });
    }

    verifyAccessToken(token) {
        return jwt.verify(token, this.#accessKey);
    }

    exportRefreshToken(user) {
        return jwt.sign({ user }, this.#refreshKey, { 'expiresIn': this.#refreshTokenExpireDate });
    }

    decodeRefreshToken(token) {
        return jwt.decode(token, { complete: true });
    }

}