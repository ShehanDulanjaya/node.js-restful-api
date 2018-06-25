const express = require ('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const Oderscontorller = require ('../controllers/order');

router.get('/', checkAuth, Oderscontorller.orders_get_all);

router.post('/',checkAuth, Oderscontorller.orders_create_order);

router.get('/:orderID', checkAuth,Oderscontorller.oders_get_order);

router.delete('/:orderID', checkAuth, Oderscontorller.orders_delete_order);

module.exports = router;