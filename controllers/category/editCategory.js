const categoryModel = require('../../models/categoryModel');
const checkIfAdmin = require('../../middlewares/checkIfAdmin');
const cloudinary = require('../../middlewares/uploadFile');
module.exports = class {
    constructor() { }

    async update(req, res) {
        const check = new checkIfAdmin();
        const checked = await check.check(req, res);
        if (checked.bool) {
            this.edit(req, res)
        } else {
            res.send(checked.message);
        }
    }

    async edit(req, res) {
        const { categoryId, title, description } = req.body;
        const categoryWithoutEdit = await categoryModel.findById(categoryId);
        const cloud = new cloudinary();
        let file = req.files.image.tempFilePath;
        let image = categoryWithoutEdit.image;
        if (req.files.image) {
            await cloud.deleteFile(categoryWithoutEdit.image);
            image = await cloud.uploadFile(file);
        }
        const category = await categoryModel.findByIdAndUpdate(categoryId,
            {
                title: title ? title : categoryWithoutEdit.title,
                description: description ? description : categoryWithoutEdit.description,
                image: image.secure_url
            })
            .then(resolved => res.send({ resolved, edit: true }))
            .catch(rejected => res.send({ reject: rejected.codeName, rejected }))
    }
}