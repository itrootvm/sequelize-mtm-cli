"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setModelsJson = exports.getModelsJson = void 0;
const fs_1 = require("fs");
const consola_1 = require("consola");
const isFile = (path) => {
    try {
        return (0, fs_1.statSync)(path).isFile();
    }
    catch (error) {
        return false;
    }
};
const isDirectory = (path) => {
    try {
        return (0, fs_1.statSync)(path).isDirectory();
    }
    catch (error) {
        return false;
    }
};
const DEFAULT_MODELS_JSON_FILE_PATH = 'models.json';
/**
 * Constructs the full path for the models.json file or the provided path.
 * @param migrationsPath {string} - The directory path for migrations.
 * @returns {string} - The full path to the models.json file.
 */
const getModelsJsonFilePath = (migrationsPath) => {
    if (isFile(migrationsPath)) {
        return migrationsPath;
    }
    else if (isDirectory(migrationsPath)) {
        return `${migrationsPath}/${DEFAULT_MODELS_JSON_FILE_PATH}`;
    }
    else {
        throw new Error(`${migrationsPath} is neither a valid file nor a directory`);
    }
};
/**
 * Retrieves the models from the models.json file.
 * @param migrationsPath {string} - The directory path for migrations.
 * @returns {ModelJson} - The parsed content of the models.json file.
 */
const getModelsJson = (migrationsPath) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = getModelsJsonFilePath(migrationsPath);
    if (!(0, fs_1.existsSync)(filePath)) {
        consola_1.default.error('The specified .json file does not exist.');
        throw new Error('File not found');
    }
    try {
        const fileContent = (0, fs_1.readFileSync)(filePath).toString();
        return JSON.parse(fileContent);
    }
    catch (error) {
        consola_1.default.error('Failed to retrieve your .json file', error);
        throw error;
    }
});
exports.getModelsJson = getModelsJson;
/**
 * Saves the provided models data to the models.json file.
 * @param migrationsPath {string} - The directory path for migrations.
 * @param newModelsJson {ModelJson} - The models data to be saved.
 */
const setModelsJson = (migrationsPath, newModelsJson) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = getModelsJsonFilePath(migrationsPath);
    try {
        const fileContent = JSON.stringify(newModelsJson);
        (0, fs_1.writeFileSync)(filePath, fileContent);
    }
    catch (error) {
        consola_1.default.error('Failed to write to .json file', error);
        throw error;
    }
});
exports.setModelsJson = setModelsJson;
//# sourceMappingURL=fs.js.map