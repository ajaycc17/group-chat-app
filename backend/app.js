const fs = require("fs");
const path = require("path");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
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

sequelize
    // .sync({ force: true })
    .sync()
    .then((res) => {
        app.listen(3000);
        // app.listen(process.env.PORT || 3000);
    })
    .catch((err) => console.log(err));
