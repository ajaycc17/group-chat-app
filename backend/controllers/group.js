const Group = require("../models/group");
const Message = require("../models/message");
const User = require("../models/user");
const GroupUser = require("../models/groupUser");

// create new group and add the admin as a group member
exports.newGrp = async (req, res, next) => {
    const name = req.body.grpName;
    const desc = req.body.desc;

    try {
        const grp = await req.user.createGroup({
            name: name,
            description: desc,
            adminId: req.user.id,
        });

        await grp.addUser(req.user.id);

        res.status(201).json({
            message: "Group successfully created",
            sucecss: true,
        });
    } catch (err) {
        res.json({ error: err });
    }
};

// add new member to the group only if you are an admin
exports.addUser = async (req, res, next) => {
    const grpId = req.body.grpId;
    const userId = req.body.userId;
    try {
        const currentUser = await GroupUser.findOne({
            where: { userId: req.user.id, groupId: grpId },
        });
        const grp = await Group.findOne({ where: { id: grpId } });
        if (grp.adminId === req.user.id || currentUser.admin === true) {
            const user = await grp.getUsers({ where: { id: userId } });
            if (user.length === 0) {
                await grp.addUser(userId);
                res.status(200).json({ message: "User added", sucecss: true });
            } else {
                res.json({ message: "User already in group" });
            }
        }
    } catch (err) {
        res.json(401).json({ message: err });
    }
};

// remove an user from the group only if you are an admin
exports.deleteUser = async (req, res, next) => {
    const grpId = req.body.grpId;
    const userId = req.body.userId;
    try {
        const currentUser = await GroupUser.findOne({
            where: { userId: req.user.id, groupId: grpId },
        });
        const grp = await Group.findOne({ where: { id: grpId } });
        if (
            (grp.adminId === req.user.id || currentUser.admin === true) &&
            Number(userId) !== grp.adminId
        ) {
            const user = await grp.getUsers({ where: { id: userId } });
            if (user.length !== 0) {
                await grp.removeUser(userId);
                res.status(200).json({ message: "User added", sucecss: true });
            } else {
                res.json({ message: "User not present in the group!" });
            }
        }
    } catch (err) {
        res.json({ message: err });
    }
};

// give admin privilege to members
exports.makeAdmin = async (req, res, next) => {
    const grpId = req.body.grpId;
    const userId = req.body.userId;
    try {
        const currentUser = await GroupUser.findOne({
            where: { userId: req.user.id, groupId: grpId },
        });
        const grp = await Group.findOne({ where: { id: grpId } });

        // either the creator of group or an admin can give privileges
        if (grp.adminId === req.user.id || currentUser.admin === true) {
            const target = await GroupUser.findOne({
                where: { userId: userId, groupId: grpId },
            });

            target.admin = true;
            await target.save();
        }
    } catch (err) {
        res.json({ message: err });
    }
};
