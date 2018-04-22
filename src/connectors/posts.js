import globalConfig from '../../configs/config.global.json';
import { db, getTableName } from '../utils/db';

const TableName = getTableName(globalConfig.ResourceNames.PostTable);

export const create = post => db.put({ TableName, Item: post }).promise();
export const readAll = async () => {
  // TODO: [WARNING] This is very inefficient. Only for quick prototyping.
  // Should use indexing methods like ElasticSearch in the future
  const result = await db.scan({ TableName }).promise();
  return result.Items.sort((first, second) => second.createdAt - first.createdAt);
};
