import { Sequelize } from 'sequelize';
import { ModelJson } from '../types';
/**
 * Generate migrations based on the changes in models
 * @param sequelize {Sequelize} - Sequelize instance with models
 * @param modelsJson {ModelJson} - The JSON representation of the models
 * @param migrationsPath {string} - The path where migrations should be saved
 * @returns {Promise<ModelJson>} - The new JSON representation of the models
 */
declare const generateMigrations: (sequelize: Sequelize, modelsJson: ModelJson, migrationsPath: string) => Promise<ModelJson>;
export default generateMigrations;
