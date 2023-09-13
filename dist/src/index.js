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
exports.generateMigrations = exports.setModelsJson = exports.getModelsJson = exports.SequelizeInitializer = void 0;
const path_1 = require("path");
const consola_1 = require("consola");
const sequelize_1 = require("./lib/sequelize");
Object.defineProperty(exports, "SequelizeInitializer", { enumerable: true, get: function () { return sequelize_1.SequelizeInitializer; } });
const fs_1 = require("./lib/fs");
Object.defineProperty(exports, "getModelsJson", { enumerable: true, get: function () { return fs_1.getModelsJson; } });
Object.defineProperty(exports, "setModelsJson", { enumerable: true, get: function () { return fs_1.setModelsJson; } });
const migrations_1 = require("./lib/migrations");
exports.generateMigrations = migrations_1.default;
const package_json_1 = require("../package.json");
class MigrationManager {
    constructor(sequelizePath, migrationsPath, dbInitializer = new sequelize_1.SequelizeInitializer()) {
        this.sequelizePath = sequelizePath;
        this.migrationsPath = migrationsPath;
        this.dbInitializer = dbInitializer;
        this.sequelizeInstance = null;
    }
    /**
     * Construct the full path for a given path.
     * @param path {string} - The path to be prefixed with current working directory.
     * @returns {string} - The full path.
     */
    getFullPath(path) {
        return (0, path_1.join)(process.cwd(), path);
    }
    /**
     * Initialize the sequelize instance and perform migrations.
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                consola_1.default.info('Using', package_json_1.version, ' version');
                consola_1.default.start('Init Sequelize instance, models & associations');
                this.sequelizeInstance = yield this.dbInitializer.init(this.getFullPath(this.sequelizePath));
                consola_1.default.success('Done');
                const modelsJson = yield (0, fs_1.getModelsJson)(this.getFullPath(this.migrationsPath));
                consola_1.default.start('Checking for model changes');
                const newModelsJson = yield (0, migrations_1.default)(this.sequelizeInstance, modelsJson, this.getFullPath(this.migrationsPath));
                yield (0, fs_1.setModelsJson)(this.getFullPath(this.migrationsPath), newModelsJson);
            }
            catch (e) {
                consola_1.default.error('Error initializing migrations', e);
                throw e;
            }
        });
    }
}
/**
 * Main execution function.
 * @param args {MainArgs} - The arguments required for the execution.
 */
const main = ({ migrationsPath, sequelizePath }) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = new MigrationManager(sequelizePath, migrationsPath);
    yield manager.init();
});
exports.default = main;
//# sourceMappingURL=index.js.map