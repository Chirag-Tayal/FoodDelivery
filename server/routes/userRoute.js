const express = require('express');
const {
    registerController,
    getUserController,
    loginController,
    updateUserController,
    getAllUserController
} = require('../controller/userController');
const {
    protectedRoute
} = require('../middleware/authMiddleware');

router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.post('/get-user',protectedRoute,getUserController) 
router.get('/get-All-users',protectedRoute,getAllUserController) 
router.post('/update-profile',protectedRoute,updateUserController) 
router.get('/test', protectedRoute, (req, res) => {
    return (
        res.send({
            message: "ok"
        })
    )
})

module.exports = router;