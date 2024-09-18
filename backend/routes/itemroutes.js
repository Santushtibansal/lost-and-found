const express = require('express');
const {itemRegister}= require('../controllers/itemController');
const authenticate = require('../middleware/authenticate');
const router2 = express.Router();    


router2.post('/itemregister',authenticate, itemRegister);
// router2.post('/login',login);

module.exports=router2;

