let express = require('express');
let router = express.Router();
let serverController = require("../controller/server.controller");


/* GET home page. */
router.post("/enroll", serverController.enroll)
router.post("/login", serverController.login)
router.post("/orderall", serverController.orderall)
router.post("/order", serverController.order)
router.post("/deleteorder", serverController.deleteorder)
router.post("/insertorder", serverController.insertorder)
router.post("/updateorder", serverController.updateorder)
router.post("/selectmessage", serverController.selectmessage)
router.post("/updatemessage", serverController.updatemessage)
router.post("/insertcustomer", serverController.insertcustomer)


router.post("/updatecustomer", serverController.updatecustomer)
router.post("/selectcustomer", serverController.selectcustomer)
router.post("/deletecustomer", serverController.deletecustomer)


module.exports = router;
