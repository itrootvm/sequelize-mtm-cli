import {join} from 'path';
import consola from 'consola';
import {SequelizeInitializer} from './lib/sequelize';
import {getModelsJson, setModelsJson} from './lib/fs';
import generateMigrations from './lib/migrations';
import {MainArgs} from './types';
import {version} from '../package.json';
import {Sequelize} from 'sequelize';

class MigrationManager {
  private sequelizeInstance: Sequelize | null = null;

  constructor(
    private sequelizePath: string,
    private migrationsPath: string,
    private dbInitializer: SequelizeInitializer = new SequelizeInitializer()
  ) {}

  /**
   * Construct the full path for a given path.
   * @param path {string} - The path to be prefixed with current working directory.
   * @returns {string} - The full path.
   */
  private getFullPath(path: string): string {
    return join(process.cwd(), path);
  }

  /**
   * Initialize the sequelize instance and perform migrations.
   */
  async init() {
    try {
      consola.info('Using', version, ' version');
      consola.start('Init Sequelize instance, models & associations');

      this.sequelizeInstance = await this.dbInitializer.init(
        this.getFullPath(this.sequelizePath)
      );

      consola.success('Done');

      const modelsJson = await getModelsJson(
        this.getFullPath(this.migrationsPath)
      );
      consola.start('Checking for model changes');

      const newModelsJson = await generateMigrations(
        this.sequelizeInstance,
        modelsJson,
        this.getFullPath(this.migrationsPath)
      );

      await setModelsJson(this.getFullPath(this.migrationsPath), newModelsJson);
    } catch (e) {
      consola.error('Error initializing migrations', e);
      throw e;
    }
  }
}

/**
 * Main execution function.
 * @param args {MainArgs} - The arguments required for the execution.
 */
const main = async ({migrationsPath, sequelizePath}: MainArgs) => {
  const manager = new MigrationManager(sequelizePath, migrationsPath);
  await manager.init();
};

export {SequelizeInitializer, getModelsJson, setModelsJson, generateMigrations};
export default main;
