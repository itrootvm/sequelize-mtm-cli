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
const types_1 = require("../types");
const templates_1 = require("./templates");
const consola_1 = require("consola");
/**
 * Get sorted model names in reverse order based on foreign key topological sorting
 * @param sequelize {Sequelize} - Sequelize instance with models
 * @returns {Promise<string[]>} - List of sorted model names in reverse order
 */
const getSortedModelNames = (sequelize) => __awaiter(void 0, void 0, void 0, function* () {
    return (sequelize.modelManager.getModelsTopoSortedByForeignKey() || [])
        .map(m => m.name)
        .reverse();
});
/**
 * Adds types to model attributes
 * @param modelAttr {Record<string, ModelAttributeColumnOptions<Model<any, any>>>} - Model attributes
 * @returns {Record<string, ModelAttributeColumnOptions<Model<any, any>>>} - Model attributes with types added
 */
const addTypesToModelAttributes = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
modelAttr
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) => __awaiter(void 0, void 0, void 0, function* () {
    const attributesWithTypes = Object.assign({}, modelAttr);
    for (const attr in modelAttr) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const attrType = modelAttr[attr].type;
        attributesWithTypes[attr].type =
            typeof attrType === 'string'
                ? attrType
                : `${attrType.key}${attrType._length ? `(${attrType._length})` : ''}`;
    }
    return attributesWithTypes;
});
/**
 * Generate migrations based on the changes in models
 * @param sequelize {Sequelize} - Sequelize instance with models
 * @param modelsJson {ModelJson} - The JSON representation of the models
 * @param migrationsPath {string} - The path where migrations should be saved
 * @returns {Promise<ModelJson>} - The new JSON representation of the models
 */
const generateMigrations = (sequelize, modelsJson, migrationsPath) => __awaiter(void 0, void 0, void 0, function* () {
    const newModelsJson = {};
    const sortedModelNames = yield getSortedModelNames(sequelize);
    // Check for additions and modifications (left-to-right diff)
    for (const modelName of sortedModelNames) {
        const modelInstance = sequelize.models[modelName];
        const modelAttributes = yield addTypesToModelAttributes(modelInstance.getAttributes());
        newModelsJson[modelName] = modelAttributes;
        if (!modelsJson[modelName]) {
            consola_1.default.start(modelName, 'does not exist, creating table');
            yield (0, templates_1.default)(types_1.TemplateTypes.CreateTable, { tableName: modelName, attributes: modelAttributes }, migrationsPath);
        }
        else {
            for (const attr in modelAttributes) {
                if (!modelsJson[modelName][attr]) {
                    consola_1.default.start(modelName, attr, 'does not exist, adding column');
                    yield (0, templates_1.default)(types_1.TemplateTypes.AddColumn, {
                        tableName: modelName,
                        columnName: attr,
                        attributes: modelAttributes[attr],
                    }, migrationsPath);
                }
                else if (JSON.stringify({ data: modelsJson[modelName][attr] }) !==
                    JSON.stringify({ data: modelAttributes[attr] })) {
                    consola_1.default.start(modelName, attr, 'is changed, modifying options');
                    yield (0, templates_1.default)(types_1.TemplateTypes.ModifyColumn, {
                        tableName: modelName,
                        columnName: attr,
                        attributes: modelAttributes[attr],
                        prevAttributes: modelsJson[modelName][attr],
                    }, migrationsPath);
                }
            }
        }
    }
    // Check for deletions (right-to-left diff)
    for (const modelName in modelsJson) {
        if (!sequelize.models[modelName]) {
            consola_1.default.start(modelName, 'shouldn`t exist, deleting table');
            yield (0, templates_1.default)(types_1.TemplateTypes.RemoveTable, { tableName: modelName }, migrationsPath);
        }
        else {
            const modelInstance = sequelize.models[modelName];
            const modelAttributes = modelInstance.getAttributes();
            for (const attr in modelsJson[modelName]) {
                if (!modelAttributes[attr]) {
                    consola_1.default.start(modelName, attr, 'shouldn`t exist, deleting column');
                    yield (0, templates_1.default)(types_1.TemplateTypes.RemoveColumn, { tableName: modelName, columnName: attr }, migrationsPath);
                }
            }
        }
    }
    return newModelsJson;
});
exports.default = generateMigrations;
//# sourceMappingURL=migrations.js.map