const userModel = require('../../models/userModel');
const strings = require('../../middlewares/strings');
const str = new strings();
const mail = require('../../middlewares/sendEmail');
const sendEmail = new mail();
const findAcc = require('../../middlewares/findAcc')
const findAccount = new findAcc();
module.exports = class {
    constructor() { }
    async resetPassword(req, res) {
        let { email, type } = req.body;
        type = str.convertFirstLetterToUpper(type);
        const found = await findAccount.verifyAcc({ email, type });
        if (found) {
            const code = sendEmail.getCode();
            await userModel.updateOne({ email: email, type: type }, { $set: { resetCode: code } })
                .then(async resolved => {
                    await sendEmail.sendEmail(email, code, "Reset Your Password", "Use This Code To Reset Your Password");
                    res.send("Check Your Email");
                })
        } else {
            res.send("User Not Found");
        }
    }
}