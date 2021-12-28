const express = require("express");
const router = express.Router();
const {  isAuth } = require("../middlewares/SignIn");
const {
    sendRequest,
    getsendedRequest,
    getReceivedRequest,
    acceptRequest,
    refuseRequest
  } = require("../controllers/request");
const {
    sendRequestValidator
  } = require("../validators/request");
  const { runValidation } = require("../validators");
  router.post("/request/send",  isAuth ,  sendRequestValidator , runValidation, sendRequest);
  router.get("/request/sendedrequests",  isAuth ,  getsendedRequest);
  router.get("/request/receivedrequests",  isAuth , getReceivedRequest);
  router.post("/request/accept",  isAuth , acceptRequest);
  router.post("/request/refuse",  isAuth , refuseRequest);

  module.exports = router;