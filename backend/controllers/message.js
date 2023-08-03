const Message = require("../models/message");
const User = require("../models/user");
const Group = require("../models/group");
const GroupUser = require("../models/groupUser");
const sequelize = require("../utils/database");

// get all groups the user is a member of
exports.getAllGrps = async (req, res, next) => {
    try {
        const myGrpIds = await GroupUser.findAll({
            attributes: ["groupId"],
            where: { userId: req.user.id },
        });
        const allGrps = [];
        for (let i = 0; i < myGrpIds.length; i++) {
            allGrps.push(myGrpIds[i].groupId);
        }
        const grps = await Group.findAll({
            attributes: ["id", "name", "description"],
            where: { id: allGrps },
        });
        res.status(200).json({ data: grps });
    } catch (err) {
        res.status(404).json({ message: "You are in no groups" });
    }
};

exports.getGrpMessages = async (req, res) => {
    const grpId = req.params.grpId;
    const off = Number(req.query.last) || 0;
    // check whether the user is in that group here - later
    try {
        const messages = await Message.findAll({
            attributes: ["id", "userId", "content", "createdAt"],
            offset: off,
            order: [["createdAt", "DESC"]],
            where: { groupId: grpId },
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.postMessage = async (req, res) => {
    const message = req.body.message;
    const grpId = req.body.grpId;
    try {
        await Message.create({
            content: message,
            userId: req.user.id,
            groupId: grpId,
        });
        res.status(201).json({
            message: "message sent successfully",
            success: true,
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
