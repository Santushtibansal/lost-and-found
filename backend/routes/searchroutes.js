const express = require('express');
const {searchByCategory} = require('../controllers/searchController');

const router3 = express.Router();

router3.get('/category/:category', searchByCategory);

module.exports= router3;