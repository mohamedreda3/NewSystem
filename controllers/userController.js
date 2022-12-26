module.exports = class User {
    constructor() { }
    async signUp(req, res) {
        const signup = require('./user/signup');
        const newSignup = new signup();
        newSignup.signUp(req, res);
    }

    async confirmCode(req, res) {
        const confirmcode = require('./user/confirmcode');
        const code = new confirmcode();
        code.confirmCode(req, res);
    }

    async logIn(req, res) {
        const login = require('./user/login');
        const findAcc = new login();
        findAcc.logIn(req, res);
    }

    async updatePassword(req, res) {
        const password = require('./user/updatePassword');
        const change = new password();
        change.changePassword(req, res);
    }

    async resetPassword(req, res) {
        const Password = require('./user/resetPassword');
        const reset = new Password();
        reset.resetPassword(req, res);
    }

    async uploadFile(req, res){
        const file = require('./user/uploadFile');
        const upload = new file();
        upload.uploadFile(req, res)
    }
}