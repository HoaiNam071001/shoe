const express = require('express');
const router = express.Router();
const Cart = require('../controllers/CartController');
router.get('/update/giam',Cart.giam);
router.get('/update/tang',Cart.tang);
router.get('/:id',Cart.add);
router.get('/', Cart.get);

module.exports = router;