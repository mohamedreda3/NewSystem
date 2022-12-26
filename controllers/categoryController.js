module.exports = class {
    constructor() { }
    save(req, res) {
        const category = require('./category/saveCategory');
        const saved = new category();
        saved.saveCategory(req, res);
    }

    edit(req, res) {
        const category = require('./category/editCategory');
        const editted = new category();
        editted.update(req, res)
    }
}