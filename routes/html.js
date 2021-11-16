let express = require('express');
let router = express.Router();
const htmlController = require("../controller/html.controller");
const tool = require("../module/tool.module");


/* GET home page. */
router.get("/*", tool.Interceptor)
router.get('/order', htmlController.order);
router.get('/message', htmlController.message);
router.get('/customer', htmlController.customer);

module.exports = router;
