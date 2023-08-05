const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const messageController = require("../controllers/message");
const userAuthMiddleware = require("../middleware/auth");

const router = express.Router();

// to get all the groups user is in
router.get("/", userAuthMiddleware.authenticate, messageController.getAllGrps);

// to get all the messages of a specific group
router.get(
    "/:grpId",
    userAuthMiddleware.authenticate,
    messageController.getGrpMessages
);

// add new messages to a specific group
router.post(
    "/add",
    userAuthMiddleware.authenticate,
    messageController.postMessage
);

// add new multimedia to a specific group
router.post(
    "/add-media",
    [userAuthMiddleware.authenticate, upload.single("file")],
    messageController.postMedia
);

module.exports = router;
