const Message = require("../models/message");
const user = require("../models/user");

exports.getAllMessages = async (req, res) => {
    const off = Number(req.query.last) || 0;
    try {
        const messages = await Message.findAll({
            offset: off,
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.postMessage = async (req, res) => {
    const message = req.body.message;
    try {
        await Message.create({
            content: message,
            userId: req.user.id,
        });
        res.status(201).json({
            message: "message sent successfully",
            success: true,
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
