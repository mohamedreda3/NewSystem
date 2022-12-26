const categoryModel = require('../../models/categoryModel');

const jwToken = require('../../middlewares/JWT');
const findAcc = require('../../middlewares/findAcc')
const findAccount = new findAcc();
const uploadFile = require('../../middlewares/uploadFile');
const upload = new uploadFile();
module.exports = class {
    constructor() { }
    async saveCategory(req, res) {
        let { title, description } = req.body;
        const data = req.files.image.tempFilePath;
        const jwt = new jwToken();
        const token = req.headers['authorization'].split("Bearer ")[1];
        try {
            const payload = jwt.verifyAccessToken(token);
            const { email } = payload.user;
            const { found, acc } = await findAccount.verifyAcc({ email, type: "Admin" });
            if (found) {
                if (acc.isVerified) {
                    const image = await upload.uploadFile(data).then(resolved => resolved.secure_url).catch(reject => reject);
                    await categoryModel({ email, title, description, image })
                        .save()
                        .then(resolved => {
                            res.send(resolved)
                        })
                        .catch(async reject => {
                            const deleteFile = await upload.deleteFile(image)
                            res.send({ reject, deleteFile })
                        })
                } else {
                    res.send("Your Account is not Verified");
                }
            } else {
                res.send("User Not Found");
            }
        } catch (err) {
            res.send(err)
        }


    }
}