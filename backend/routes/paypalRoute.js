const express = require("express")
const router = express.Router()
const { isSignedIn, isAuthenticated} = require("../controllers/auth");
const { getToken, processPayment } = require("../controllers/paypalPayment");
const {getUserById} = require( "../controllers/user")

router.param("userId",getUserById)

router.get("/payment/getToken/:userId",isAuthenticated,isSignedIn,getToken)

router.post("/payment/paypal/:userId",isSignedIn,isAuthenticated,processPayment)

module.exports = router