"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const sequelize_1 = require("sequelize");
const associationsFile = 'associations';
const importDefaultFunction = (path) => {
    const imported = require(path);
    let init = imported;
    if (typeof imported !== 'function') {
        init = imported.default;
    }
    if (!init) {
        console.error(imported, 'does not have a default export');
        return Promise.reject(imported + ' does not have a default export');
    }
    return init;
};
const initModels = async (sequelize) => {
    for (const model of (0, fs_1.readdirSync)(__dirname)) {
        const modelNoExtention = model.slice(0, -3);
        if (model !== (0, path_1.basename)(__filename) &&
            modelNoExtention !== associationsFile) {
            const init = await importDefaultFunction((0, path_1.join)(__dirname, modelNoExtention));
            console.log('Init model', modelNoExtention);
            await init(sequelize);
        }
    }
    if ((0, fs_1.existsSync)((0, path_1.join)(__dirname, associationsFile + '.js')) ||
        (0, fs_1.existsSync)((0, path_1.join)(__dirname, associationsFile + '.ts'))) {
        const { default: init } = require((0, path_1.join)(__dirname, associationsFile));
        if (!init) {
            console.error(associationsFile, 'does not have a default export');
            return Promise.reject(associationsFile + ' does not have a default export');
        }
        console.log('Applying associations');
        await init(sequelize);
    }
    else {
        console.warn('No associations - skipping...');
    }
    return sequelize;
};
const initDB = async () => {
    const sequelize = new sequelize_1.Sequelize({
        dialect: 'sqlite',
        storage: './db.sqlite',
        database: 'test',
    });
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return await initModels(sequelize);
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
        return Promise.reject('Unable to connect to the database');
    }
};
exports.default = initDB;
