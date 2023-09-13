import {Sequelize, DataTypes} from 'sequelize';

export const modelName = 'settings';

const settings = (sequelize: Sequelize) => {
  return sequelize.define(modelName, {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
    testField: {
      type: DataTypes.NUMBER,
      defaultValue: () => 2 * 2 + 4,
      allowNull: false,
    },
  });
};

export default settings;
