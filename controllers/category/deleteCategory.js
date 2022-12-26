const categoryModel = require('../../models/categoryModel');
const checkIfAdmin = require('../../middlewares/checkIfAdmin')
module.exports = class {
    constructor() { }
    
    async delete(req, res) {
        const check = new checkIfAdmin();
        const checked = await check.check(req, res);
        if (checked.bool) {
            this.exec(req, res)
        } else {
            res.send(checked.message);
        }
    }

    async exec(req, res) {
        const { categoryId } = req.body;
        const category = await categoryModel.findByIdAndDelete(categoryId)
            .then(resolved => res.send(resolved))
            .catch(rejected => res.send({ rejected: rejected.codeName }))
    }
}