const cloudinary = require('cloudinary')
module.exports = class UploadFileToCloudinary {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret
        })
    }
    async uploadFile(file) {
        const upload = await cloudinary.v2.uploader.upload(file)
        return upload;
    }
    async deleteFile(file) {
        file = (file.split('/')[file.split('/').length - 1]).split('.')[0];
        return await cloudinary.v2.uploader.destroy(file);
    }
}