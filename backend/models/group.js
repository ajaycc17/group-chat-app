const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Group = sequelize.define("group", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
    },
    adminId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = Group;
