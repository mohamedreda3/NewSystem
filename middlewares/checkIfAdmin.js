const jwToken = require('./JWT');
const findAcc = require('./findAcc')
const findAccount = new findAcc();
module.exports = class {
    constructor() { }
    async check(req, res) {
        let bool = false;
        let message = "";
        const jwt = new jwToken();
        const token = req.headers['authorization'].split("Bearer ")[1];
        try {
            const payload = jwt.verifyAccessToken(token);
            const { email } = payload.user;
            const { found, verified } = await findAccount.verifyAcc({ email, type: "Admin" });
            if (found) {
                if (verified) {
                    bool = true;
                } else {
                    bool = false;
                    message = "Your Account is not Verified";
                }
            } else {
                message = "User Not Found";
                bool = false;
            }
        } catch (err) {
            bool = false;
            message = err.message;
        }
        return { bool, message: message };
    }
}