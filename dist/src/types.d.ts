import { Model, ModelAttributeColumnOptions, Sequelize } from 'sequelize';
/**
 * Type representing the JSON structure of models.
 */
export type ModelJson = {
    [modelName: string]: {
        [attributeName: string]: ModelAttributeColumnOptions<Model<any, any>>;
    };
};
/**
 * Enum for template types.
 */
export declare enum TemplateTypes {
    CreateTable = "createTable",
    RemoveTable = "removeTable",
    AddColumn = "addColumn",
    RemoveColumn = "removeColumn",
    ModifyColumn = "modifyColumn"
}
/**
 * Type representing template attributes.
 */
type TemplateAttributes = ModelAttributeColumnOptions<Model<any, any>> | {
    [key: string]: ModelAttributeColumnOptions<Model<any, any>>;
};
/**
 * Interface for the data required to render templates.
 */
export interface TemplateData {
    tableName: string;
    columnName?: string;
    attributes?: TemplateAttributes;
    prevAttributes?: TemplateAttributes;
}
/**
 * Main arguments type.
 */
export type MainArgs = {
    sequelizePath: string;
    migrationsPath: string;
};
/**
 * Interface for initializing the database.
 */
export interface IDbInitializer {
    init(sequelizePath: string): Promise<Sequelize>;
}
/**
 * Interface for generating migrations.
 */
export interface IMigrationGenerator {
    generate(sequelize: Sequelize, modelsJson: ModelJson, migrationsPath: string): Promise<ModelJson>;
}
/**
 * Interface for rendering templates.
 */
export interface ITemplateRenderer {
    render(templateName: TemplateTypes, data: TemplateData, migrationsPath: string): Promise<void>;
}
/**
 * Interface for basic file system operations.
 */
export interface IFileSystem {
    read(path: string): Promise<string>;
    write(path: string, content: string): Promise<void>;
    exists(path: string): boolean;
}
export {};
