const express = require('express');
const { createFoodController, getAllFoodController,createCategoryController, getAllcategoriesController, getFoodItemController, getANewFoodController, getSpecialFoodController } = require('../controller/foodController');
const { protectedRoute } = require('../middleware/authMiddleware');
router = express.Router()


router.post('/addFood',protectedRoute, createFoodController)
router.get('/get-all-foods',protectedRoute, getAllFoodController)
router.get('/get-new-foods',protectedRoute, getANewFoodController)
router.get('/get-special-foods',protectedRoute, getSpecialFoodController)
router.get('/get-food-item/:id',protectedRoute, getFoodItemController)
router.post('/create-category',protectedRoute, createCategoryController) 
router.get('/get-all-categories',protectedRoute, getAllcategoriesController) 

module.exports = router;