import { ModelJson } from '../types';
/**
 * Retrieves the models from the models.json file.
 * @param migrationsPath {string} - The directory path for migrations.
 * @returns {ModelJson} - The parsed content of the models.json file.
 */
export declare const getModelsJson: (migrationsPath: string) => Promise<ModelJson>;
/**
 * Saves the provided models data to the models.json file.
 * @param migrationsPath {string} - The directory path for migrations.
 * @param newModelsJson {ModelJson} - The models data to be saved.
 */
export declare const setModelsJson: (migrationsPath: string, newModelsJson: ModelJson) => Promise<void>;
