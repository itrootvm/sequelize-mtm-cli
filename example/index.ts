import express from 'express';

import initDB from './db/models';
import usersRoutes from './routes/users.router';
import tasksRoutes from './routes/tasks.router';
import bodyParser from 'body-parser';

const app = express();

const port = 3000;

initDB().then(sequelize => {
  app.set('db', sequelize);
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.use('/users', usersRoutes);

  app.use('/tasks', tasksRoutes);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
