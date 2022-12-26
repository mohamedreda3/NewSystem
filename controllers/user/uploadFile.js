const cloudinary = require("cloudinary");
module.exports = class {
    constructor() { }
    async uploadFile(req, res) {
        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret
        })
        cloudinary.v2.uploader.upload(req.files.file.tempFilePath)
            .then(resolve => res.send(resolve.secure_url))
            .catch(err => res.send(err))

    }
}