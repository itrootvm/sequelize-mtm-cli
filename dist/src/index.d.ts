import { SequelizeInitializer } from './lib/sequelize';
import { getModelsJson, setModelsJson } from './lib/fs';
import generateMigrations from './lib/migrations';
import { MainArgs } from './types';
/**
 * Main execution function.
 * @param args {MainArgs} - The arguments required for the execution.
 */
declare const main: ({ migrationsPath, sequelizePath }: MainArgs) => Promise<void>;
export { SequelizeInitializer, getModelsJson, setModelsJson, generateMigrations };
export default main;
