const fs = require("fs");
const path = require("path");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config({ path: "../.env" });

const User = require("./models/user");

const sequelize = require("./utils/database");
const adminRoutes = require("./routes/admin");

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

sequelize
    // .sync({ force: true })
    .sync()
    .then((res) => {
        app.listen(3000);
        // app.listen(process.env.PORT || 3000);
    })
    .catch((err) => console.log(err));
