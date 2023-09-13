"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelName = void 0;
const sequelize_1 = require("sequelize");
exports.modelName = 'users';
const Users = (sequelize) => {
    return sequelize.define(exports.modelName, {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        fullName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 20,
            },
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        phoneNumber: {
            type: sequelize_1.DataTypes.STRING,
        },
        gender: {
            type: sequelize_1.DataTypes.STRING,
            validate: {
                isIn: [['male', 'female', 'n/a']],
            },
        },
        locale: {
            type: sequelize_1.DataTypes.STRING,
        },
    });
};
exports.default = Users;
