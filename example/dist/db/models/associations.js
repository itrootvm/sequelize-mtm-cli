"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addAssociations = (sequelize) => {
    const { users, tasks } = sequelize.models;
    users.hasMany(tasks);
    tasks.belongsTo(users);
    return sequelize;
};
exports.default = addAssociations;
