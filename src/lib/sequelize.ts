import consola from 'consola';
import {existsSync} from 'fs';
import {Sequelize} from 'sequelize';
import {IDbInitializer} from '../types';

export class SequelizeInitializer implements IDbInitializer {
  async init(sequelizePath: string): Promise<Sequelize> {
    if (!existsSync(sequelizePath)) {
      consola.error(sequelizePath, 'does not exist');
      return Promise.reject('sequelize path not exist');
    }
    const {default: init} = require(sequelizePath.slice(0, -3)); // Remove the extention {.js | ,ts}
    if (!init) {
      consola.error(sequelizePath, 'does not have a default export');
      return Promise.reject(sequelizePath + ' does not have a default export');
    }
    try {
      console.group('Sequelize init');
      const res: Sequelize = await init();
      console.groupEnd();
      return res;
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
