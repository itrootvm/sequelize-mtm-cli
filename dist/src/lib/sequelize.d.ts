import { Sequelize } from 'sequelize';
import { IDbInitializer } from '../types';
export declare class SequelizeInitializer implements IDbInitializer {
    init(sequelizePath: string): Promise<Sequelize>;
}
