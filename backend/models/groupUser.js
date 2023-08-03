const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const GroupUser = sequelize.define("groupUser", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
});

module.exports = GroupUser;
