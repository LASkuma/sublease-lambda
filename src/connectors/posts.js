import AWS from 'aws-sdk';

import globalConfig from '../../configs/config.global.json';
import { db, getTableName } from '../utils/db';

const stepFunctions = new AWS.StepFunctions({ region: 'us-east-1' });

const getStateMachineArn = (name) => {
  let env = process.env.NODE_ENV;
  if (env === 'development') {
    env = 'beta';
  }
  return `arn:aws:states:us-east-1:336626025201:stateMachine:${env}-${name}`;
};

const TableName = getTableName(globalConfig.ResourceNames.PostTable);

export const create = post => db.put({ TableName, Item: post }).promise();

export const readAll = async () => {
  // TODO: [WARNING] This is very inefficient. Only for quick prototyping.
  // Should use indexing methods like ElasticSearch in the future
  const result = await db.scan({ TableName }).promise();
  return result.Items.sort((first, second) => second.createdAt - first.createdAt);
};

export const readById = async (id) => {
  const result = await db.get({ TableName, Key: { id } }).promise();
  return result.Item;
};

export const publish = post =>
  stepFunctions
    .startExecution({
      stateMachineArn: getStateMachineArn('publish'),
      input: JSON.stringify({ post }),
    })
    .promise();
