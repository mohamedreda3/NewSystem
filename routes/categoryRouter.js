const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const category = new categoryController()

router.post('/save', (req, res) => category.save(req, res))
router.post('/edit', (req, res) => category.edit(req, res))

module.exports = router;