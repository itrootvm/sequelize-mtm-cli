"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelName = void 0;
const sequelize_1 = require("sequelize");
exports.modelName = 'settings';
const settings = (sequelize) => {
    return sequelize.define(exports.modelName, {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        key: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        value: {
            type: sequelize_1.DataTypes.STRING,
        },
        isActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
        },
        testField: {
            type: sequelize_1.DataTypes.NUMBER,
            defaultValue: () => 2 * 2 + 4,
            allowNull: false,
        },
    });
};
exports.default = settings;
