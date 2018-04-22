import globalConfig from '../../configs/config.global.json';
import { db, getTableName } from '../utils/db';

const TableName = getTableName(globalConfig.ResourceNames.PostTable);

export const create = post => db.put({ TableName, Item: post }).promise();
