const md5 = require("md5");
const userModel = require('../../models/userModel');
const findAcc = require('../../middlewares/findAcc')
const findAccount = new findAcc();
module.exports = class {
    constructor() { }
    async changePassword(req, res) {
        let { processType } = req.body;
        if (processType == "UPDATE_PASSWORD") {
            const jwtoken = require('../../middlewares/JWT');
            const jwt = new jwtoken();
            const token = req.headers['authorization'].split("Bearer ")[1];
            try {
                const payload = jwt.verifyAccessToken(token);
                const { email, type } = payload.user;
                let { oldPassword, newPassword } = req.body;
                const verifyOldPassword = findAccount.verifyNotNull(oldPassword);
                const verifyNewPassword = findAccount.verifyNotNull(newPassword);
                if (verifyOldPassword && verifyNewPassword) {
                    const password = md5(oldPassword);
                    newPassword = md5(newPassword);
                    const { found } = await findAccount.verifyAcc({ email, type, password });
                    if (found) {
                        await userModel.updateOne({ email: email, type: type, password: password }, { $set: { password: newPassword } })
                            .then(resolved => res.send(resolved))
                            .catch(rejected => res.send({ rejected, message: " Wrong Password" }));
                    } else {
                        res.send("User Not Found Or Wrong Password");
                    }
                } else {
                    res.send('Invalid Password');
                }
            } catch (err) {
                res.send(err.message);
            }
        } else if (processType == "RESET_PASSWORD") {
            let { email, type, resetCode, newPassword } = req.body;
            const verifyNewPassword = findAccount.verifyNotNull(newPassword);
            newPassword = md5(newPassword);
            const found = await findAccount.verifyAcc({ email, type, resetCode });
            if (found) {
                await userModel.updateOne({ email: email, type: type, resetCode: resetCode }, { $set: { password: newPassword } })
                    .then(resolved => res.send(resolved))
                    .catch(rejected => res.send({ rejected, message: " Wrong Code" }));
            } else {
                res.send("User Not Found Or Wrong Code");
            }
        } else {
            res.send("Invalid Process");
        }
    }
}