const Group = require("../models/group");
const Message = require("../models/message");
const user = require("../models/user");

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

exports.addUser = async (req, res, next) => {
    const grpId = req.body.grpId;
    const userId = req.body.userId;
    try {
        const grp = await Group.findOne({ where: { id: grpId } });
        if (grp.adminId === req.user.id) {
            const user = await grp.getUsers({ where: { id: userId } });
            console.log(user);
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
