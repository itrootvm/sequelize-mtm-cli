import {Router} from 'express';
import {Sequelize} from 'sequelize';

import {modelName as users} from '../db/models/users.model';
import {modelName as tasks} from '../db/models/tasks.model';

const usersRoutes = Router();

usersRoutes.get('/', async (req, res) => {
  try {
    const sequelize: Sequelize = req.app.get('db');
    const {count, rows} = await sequelize.model(users).findAndCountAll();
    res.json({count, rows});
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

usersRoutes.post('/', async (req, res) => {
  try {
    const sequelize: Sequelize = req.app.get('db');
    const data = await sequelize.model(users).create(req.body);
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

usersRoutes.get('/:id', async (req, res) => {
  try {
    const sequelize: Sequelize = req.app.get('db');
    const data = await sequelize
      .model(users)
      .findByPk(req.params.id, {include: tasks});
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});
export default usersRoutes;
