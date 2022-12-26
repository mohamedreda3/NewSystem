const mongo = require('mongoose');
const schema = new mongo.Schema({
    // _id: { type: mongo.Types.ObjectId, },
    email: { unique: true, type: String, required: true, ref: 'users' },
    userName: { type: String, required: true },
    kind: { required: true, type: String, },
    type: { required: true, type: String, },
    password: { required: true, type: String, },
    isVerified: { type: Boolean, default: false },
    resetCode: { type: String, default: null },
    address: { required: true, type: String },
    postalCode: { required: true, type: String },
    verifyCode: { required: true, type: String },
    createdAt: { type: Date, required: true, default: Date.now() },
    avatar: { default: "https://cdn-icons-png.flaticon.com/512/3899/3899618.png", type: String }
})

const userModel = mongo.model('users', schema);

module.exports = userModel;
