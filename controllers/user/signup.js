const md5 = require('md5');
const mongoose = require('../../models/userModel');
const strings = require("../../middlewares/strings");
const str = new strings();
const mail = require('../../middlewares/sendEmail');
const sendEmail = new mail();
module.exports = class {
    constructor() { }
    async signUp(req, res) {
        let { name, email, type, password, kind, postalCode, address } = req.body;
        type = str.convertFirstLetterToUpper(type);
        password = password != null && password != undefined && password != '' ? md5(password) : password;
        const verifyCode = sendEmail.getCode();

        await mongoose({ userName: name, email, type, password, kind, verifyCode, postalCode, address })
            .save()
            .then(
                async resolved => {
                    await sendEmail.sendEmail(email, verifyCode, "Verify your account", "Please use this code to verify your account");
                    res.send({ saved: true, found: false });
                }
            )
            .catch(rejected => res.send({ rejected, found: true }))
    }
}