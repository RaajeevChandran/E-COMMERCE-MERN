const express = require("express")
const router = express.Router()

const {getUserById,getUser,getAllUsers,updateUser,userPurchaseList} = require('../controllers/user')
const {isSignedIn,isAdmin,isAuthenticated} = require('../controllers/auth')


router.param('userId',getUserById)

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser)

router.get("/orders/user/:userId",isSignedIn,isAuthenticated,userPurchaseList)


//Route to get all the users in the database.The controller method is commented as well
// router.get("/users",getAllUsers)




module.exports = router

