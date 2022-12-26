const mongoose = require("mongoose");
const mongoUserModel = require('../../models/userModel')
module.exports = class {
    constructor() { }
    async confirmCode(req, res) {
        const { processType, email } = req.body;
        await mongoUserModel.find({ email: email })
            .then(async resolved => {
                if (processType == "VERIFYACCOUNT") {
                    const { verifyCode } = req.body;
                    await mongoUserModel.updateOne({ email: email, verifyCode: verifyCode }, { $set: { isVerified: true } })
                        .then(resolved => res.status(201).json(resolved))
                        .catch(err => res.status(402).json({ message: mongoose.Error.Messages, verified: false }))
                } else if (processType == "RESETACCOUNT") {
                    const { resetCode } = req.body;
                    await mongoUserModel.findOne({ email: email, resetCode: resetCode })
                        .then(resolved => res.status(201).json({ found: true }))
                        .catch(err => res.status(402).json({ message: mongoose.Error.Messages, Found: false }))
                }
            })
            .catch(
                rejected => res.status(402).json({ message: "Account Not Found" })
            )
    }
}