const express = require('express');
const { protectedRoute } = require('../middleware/authMiddleware');
const { createOrderController, getAllOrderController, getSingleOrderController, markOrderDeliveredController, createOrderControllerCOD } = require('../controller/orderController');
router = express.Router()

 
router.post('/create-order',protectedRoute, createOrderController)
router.post('/create-order-cod',protectedRoute, createOrderControllerCOD)
router.get('/get-all-orders',protectedRoute, getAllOrderController)
router.post('/get-my-order',protectedRoute, getSingleOrderController)
router.post('/mark-order',protectedRoute, markOrderDeliveredController)


module.exports = router;