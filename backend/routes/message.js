const express = require("express");

const messageController = require("../controllers/message");
const userAuthMiddleware = require("../middleware/auth");

const router = express.Router();

router.get(
    "/",
    userAuthMiddleware.authenticate,
    messageController.getAllMessages
);
router.post(
    "/add",
    userAuthMiddleware.authenticate,
    messageController.postMessage
);

module.exports = router;
