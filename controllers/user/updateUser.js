const userModel = require('../../models/userModel');
const jwToken = require('../../middlewares/JWT');
module.exports = class {
    constructor() { }

    async update(req, res) {
        this.edit(req, res);
    }

    async edit(req, res) {
        const { name, type, password, kind, verifyCode, postalCode, address } = req.body;
        try {
            const jwt = new jwToken();
            const payload = jwt.verifyAccessToken(req.headers['authorization'].split("Bearer ")[1]);
            const { email, type } = payload.user;
            const userWithoutEdit = await userModel.findOne({email, type});

            const user = await userModel.updateOne({email, type},
                {
                    $set: {
                        userName: name ? name : userWithoutEdit.userName,
                    }
                })
                .then(resolved => res.send({ resolved, edit: true }))
                .catch(rejected => res.send({ reject: rejected.codeName, rejected }))
        }
        catch (err) {
            res.send(err.message);
        }
    }
}