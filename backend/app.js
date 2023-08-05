const fs = require("fs");
const path = require("path");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const User = require("./models/user");
const Message = require("./models/message");
const Group = require("./models/group");
const GroupUser = require("./models/groupUser");

const sequelize = require("./utils/database");
const adminRoutes = require("./routes/admin");
const messageRoutes = require("./routes/message");
const grpRoutes = require("./routes/group");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
);

app.use(
    cors({
        origin: "http://localhost:3001",
        credentials: true,
    })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));
app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/user", adminRoutes);
app.use("/message", messageRoutes);
app.use("/group", grpRoutes);

// user to meesage relation
User.hasMany(Message);
Message.belongsTo(User);

// message to group relation
Group.hasMany(Message);
Message.belongsTo(Group);

// many to many relation of members and group
User.belongsToMany(Group, { through: GroupUser });
Group.belongsToMany(User, { through: GroupUser });

// using socket
const onlineUsers = [];
io.use(function (socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(
            socket.handshake.query.token,
            process.env.JWT_SECRET,
            function (err, decoded) {
                if (err) return next(new Error("Authentication error"));
                socket.decoded = decoded;
                next();
            }
        );
    } else {
        next(new Error("Authentication error"));
    }
}).on("connection", (socket) => {
    console.log("A connection has been made");
    // store user in users array as online
    socket.on("online", (userId) => {
        onlineUsers.push({ userId: userId, socketId: socket.id });
    });

    // add member to group
    socket.on("add member", async (userId) => {
        const target = onlineUsers.find((user) => user.userId === userId);

        if (target !== undefined) {
            const myGrpIds = await GroupUser.findAll({
                attributes: ["groupId"],
                where: { userId: userId },
            });
            const allGrps = [];
            for (let i = 0; i < myGrpIds.length; i++) {
                allGrps.push(myGrpIds[i].groupId);
            }
            const grps = await Group.findAll({
                attributes: ["id", "name", "description"],
                where: { id: allGrps },
            });
            console.log(target.socketId);
            io.to(target.socketId).emit("grpData", grps);
        }
    });

    // make user join a room
    socket.on("join", function (room) {
        socket.join(room);
    });

    // broadcast the message to a room
    socket.on("send message", (msg, room) => {
        io.in(room).emit("room message", msg);
    });

    // on disconnection
    socket.on("disconnect", () => {
        console.log("A disconnection has been made");
    });
});

sequelize
    // .sync({ force: true })
    .sync()
    .then((res) => {
        server.listen(3000);
        // app.listen(process.env.PORT || 3000);
    })
    .catch((err) => console.log(err));
