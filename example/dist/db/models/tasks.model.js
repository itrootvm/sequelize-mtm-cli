"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelName = void 0;
const sequelize_1 = require("sequelize");
const users_model_1 = require("./users.model");
exports.modelName = 'tasks';
const Tasks = (sequelize) => {
    return sequelize.define(exports.modelName, {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        isCompleted: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: users_model_1.modelName,
                key: 'id',
            },
        },
    });
};
exports.default = Tasks;
