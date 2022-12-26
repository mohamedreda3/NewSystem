const mongo = require('mongoose');
const categoryModel = new mongo.Schema({
    email: { type: String, required: true, ref: 'users' },
    title: { unique: true, type: String, required: true },
    description: { type: String },
    image: { required: true, type: String, default: "https://cdn-icons-png.flaticon.com/512/5736/5736652.png" },
    reference: { type: mongo.Types.ObjectId, ref: 'category' }
});

module.exports = mongo.model('category', categoryModel);