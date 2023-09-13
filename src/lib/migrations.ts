import {Model, ModelAttributeColumnOptions, Sequelize} from 'sequelize';
import {ModelJson, TemplateTypes} from '../types';
import renderTemplate from './templates';
import consola from 'consola';

/**
 * Get sorted model names in reverse order based on foreign key topological sorting
 * @param sequelize {Sequelize} - Sequelize instance with models
 * @returns {Promise<string[]>} - List of sorted model names in reverse order
 */
const getSortedModelNames = async (sequelize: Sequelize): Promise<string[]> => {
  return (sequelize.modelManager.getModelsTopoSortedByForeignKey() || [])
    .map(m => m.name)
    .reverse();
};

/**
 * Adds types to model attributes
 * @param modelAttr {Record<string, ModelAttributeColumnOptions<Model<any, any>>>} - Model attributes
 * @returns {Record<string, ModelAttributeColumnOptions<Model<any, any>>>} - Model attributes with types added
 */
const addTypesToModelAttributes = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelAttr: Record<string, ModelAttributeColumnOptions<Model<any, any>>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<Record<string, ModelAttributeColumnOptions<Model<any, any>>>> => {
  const attributesWithTypes = {...modelAttr};

  for (const attr in modelAttr) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const attrType = modelAttr[attr].type as any;

    attributesWithTypes[attr].type =
      typeof attrType === 'string'
        ? attrType
        : `${attrType.key}${attrType._length ? `(${attrType._length})` : ''}`;
  }

  return attributesWithTypes;
};

/**
 * Generate migrations based on the changes in models
 * @param sequelize {Sequelize} - Sequelize instance with models
 * @param modelsJson {ModelJson} - The JSON representation of the models
 * @param migrationsPath {string} - The path where migrations should be saved
 * @returns {Promise<ModelJson>} - The new JSON representation of the models
 */
const generateMigrations = async (
  sequelize: Sequelize,
  modelsJson: ModelJson,
  migrationsPath: string
): Promise<ModelJson> => {
  const newModelsJson: ModelJson = {};
  const sortedModelNames = await getSortedModelNames(sequelize);

  // Check for additions and modifications (left-to-right diff)
  for (const modelName of sortedModelNames) {
    const modelInstance = sequelize.models[modelName];
    const modelAttributes = await addTypesToModelAttributes(
      modelInstance.getAttributes()
    );

    newModelsJson[modelName] = modelAttributes;

    if (!modelsJson[modelName]) {
      consola.start(modelName, 'does not exist, creating table');
      await renderTemplate(
        TemplateTypes.CreateTable,
        {tableName: modelName, attributes: modelAttributes},
        migrationsPath
      );
    } else {
      for (const attr in modelAttributes) {
        if (!modelsJson[modelName][attr]) {
          consola.start(modelName, attr, 'does not exist, adding column');
          await renderTemplate(
            TemplateTypes.AddColumn,
            {
              tableName: modelName,
              columnName: attr,
              attributes: modelAttributes[attr],
            },
            migrationsPath
          );
        } else if (
          JSON.stringify({data: modelsJson[modelName][attr]}) !==
          JSON.stringify({data: modelAttributes[attr]})
        ) {
          consola.start(modelName, attr, 'is changed, modifying options');
          await renderTemplate(
            TemplateTypes.ModifyColumn,
            {
              tableName: modelName,
              columnName: attr,
              attributes: modelAttributes[attr],
              prevAttributes: modelsJson[modelName][attr],
            },
            migrationsPath
          );
        }
      }
    }
  }

  // Check for deletions (right-to-left diff)
  for (const modelName in modelsJson) {
    if (!sequelize.models[modelName]) {
      consola.start(modelName, 'shouldn`t exist, deleting table');
      await renderTemplate(
        TemplateTypes.RemoveTable,
        {tableName: modelName},
        migrationsPath
      );
    } else {
      const modelInstance = sequelize.models[modelName];
      const modelAttributes = modelInstance.getAttributes();

      for (const attr in modelsJson[modelName]) {
        if (!modelAttributes[attr]) {
          consola.start(modelName, attr, 'shouldn`t exist, deleting column');
          await renderTemplate(
            TemplateTypes.RemoveColumn,
            {tableName: modelName, columnName: attr},
            migrationsPath
          );
        }
      }
    }
  }

  return newModelsJson;
};

export default generateMigrations;
