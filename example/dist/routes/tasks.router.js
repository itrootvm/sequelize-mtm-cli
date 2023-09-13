"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_model_1 = require("../db/models/users.model");
const tasks_model_1 = require("../db/models/tasks.model");
const tasksRoutes = (0, express_1.Router)();
tasksRoutes.get('/', async (req, res) => {
    try {
        const sequelize = req.app.get('db');
        const { count, rows } = await sequelize.model(tasks_model_1.modelName).findAndCountAll();
        res.json({ count, rows });
    }
    catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});
tasksRoutes.post('/', async (req, res) => {
    try {
        const sequelize = req.app.get('db');
        const data = await sequelize.model(tasks_model_1.modelName).create(req.body);
        res.json(data);
    }
    catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});
tasksRoutes.get('/:id', async (req, res) => {
    try {
        const sequelize = req.app.get('db');
        const data = await sequelize
            .model(tasks_model_1.modelName)
            .findByPk(req.params.id, { include: sequelize.model(users_model_1.modelName) });
        res.json(data);
    }
    catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});
exports.default = tasksRoutes;
