// the work that should be done when sending a request to this url
const express = require("express");
const router = express.Router();
const { Receive } = require("../controllers/user");
router.post("/post", Receive);

module.exports = router;
