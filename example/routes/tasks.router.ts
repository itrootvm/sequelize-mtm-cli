import {Router} from 'express';
import {Sequelize} from 'sequelize';

import {modelName as users} from '../db/models/users.model';
import {modelName as tasks} from '../db/models/tasks.model';

const tasksRoutes = Router();

tasksRoutes.get('/', async (req, res) => {
  try {
    const sequelize: Sequelize = req.app.get('db');
    const {count, rows} = await sequelize.model(tasks).findAndCountAll();
    res.json({count, rows});
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

tasksRoutes.post('/', async (req, res) => {
  try {
    const sequelize: Sequelize = req.app.get('db');
    const data = await sequelize.model(tasks).create(req.body);
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

tasksRoutes.get('/:id', async (req, res) => {
  try {
    const sequelize: Sequelize = req.app.get('db');
    const data = await sequelize
      .model(tasks)
      .findByPk(req.params.id, {include: sequelize.model(users)});
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});
export default tasksRoutes;
