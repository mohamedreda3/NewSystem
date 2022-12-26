const md5 = require('md5');
const mongoose = require('mongoose');
const jwt = require('../../middlewares/JWT');
const jwToken = new jwt();
const userModel = require('../../models/userModel');
const strings = require('../../middlewares/strings');
const str = new strings();
module.exports = class {
    constructor() { }
    async logIn(req, res) {
        let { email, password, type } = req.body;
        type = type && type.length > 0 ? str.convertFirstLetterToUpper(type) : type;
        password = password ? md5(password) : password;
        const acc = await userModel.findOne({ email: email, password: password, type: type });
        if (acc != null && acc != undefined && acc.length != 0) {
            await userModel.findOne({ email: email, password: password, type: type }, { password: 0, verifyCode: 0, resetCode: 0, type: 0, _id: 0 })
                .then(
                    resolved => {
                        const accessToken = jwToken.exportAccessToken({ email, type });
                        res.json({ resolved, loggedIn: true, accessToken });
                    }
                )
                .catch(rejected => res.status(404).json({ rejected: mongoose.Error.messages, loggedIn: false }))
        } else {
            res.send({ message: "User Not Found Or Wrong Password" });
        }
    }
}