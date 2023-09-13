import {existsSync, readFileSync, writeFileSync, statSync} from 'fs';
import {ModelJson} from '../types';
import consola from 'consola';

const isFile = (path: string): boolean => {
  try {
    return statSync(path).isFile();
  } catch (error) {
    return false;
  }
};

const isDirectory = (path: string): boolean => {
  try {
    return statSync(path).isDirectory();
  } catch (error) {
    return false;
  }
};
const DEFAULT_MODELS_JSON_FILE_PATH = 'models.json';

/**
 * Constructs the full path for the models.json file or the provided path.
 * @param migrationsPath {string} - The directory path for migrations.
 * @returns {string} - The full path to the models.json file.
 */

const getModelsJsonFilePath = (migrationsPath: string): string => {
  if (isFile(migrationsPath)) {
    return migrationsPath;
  } else if (isDirectory(migrationsPath)) {
    return `${migrationsPath}/${DEFAULT_MODELS_JSON_FILE_PATH}`;
  } else {
    throw new Error(
      `${migrationsPath} is neither a valid file nor a directory`
    );
  }
};

/**
 * Retrieves the models from the models.json file.
 * @param migrationsPath {string} - The directory path for migrations.
 * @returns {ModelJson} - The parsed content of the models.json file.
 */
export const getModelsJson = async (
  migrationsPath: string
): Promise<ModelJson> => {
  const filePath = getModelsJsonFilePath(migrationsPath);

  if (!existsSync(filePath)) {
    consola.error('The specified .json file does not exist.');
    throw new Error('File not found');
  }

  try {
    const fileContent = readFileSync(filePath).toString();
    return JSON.parse(fileContent);
  } catch (error) {
    consola.error('Failed to retrieve your .json file', error);
    throw error;
  }
};

/**
 * Saves the provided models data to the models.json file.
 * @param migrationsPath {string} - The directory path for migrations.
 * @param newModelsJson {ModelJson} - The models data to be saved.
 */
export const setModelsJson = async (
  migrationsPath: string,
  newModelsJson: ModelJson
): Promise<void> => {
  const filePath = getModelsJsonFilePath(migrationsPath);

  try {
    const fileContent = JSON.stringify(newModelsJson);
    writeFileSync(filePath, fileContent);
  } catch (error) {
    consola.error('Failed to write to .json file', error);
    throw error;
  }
};
