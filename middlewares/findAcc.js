const userModel = require('../models/userModel');
module.exports = class {
    constructor() { }
    async verifyAcc(data) {
        let found = false;
        const acc = await userModel.findOne(data);
        (acc != null && acc != undefined && acc.length != 0) ? found = true : found = false;
        return { found: acc != null && acc != undefined && acc.length != 0, acc, verified: acc ? acc.isVerified : false };
    }

    verifyNotNull(data) {
        return data != null && data != undefined && data != "";
    }
}