import AWS from 'aws-sdk';
import globalConfig from '../../configs/config.global.json';

const options = { region: globalConfig.AwsRegion };
const localOptions = {
  region: 'localhost',
  endpoint: 'http://localhost:8000',
};

const isTest = process.env.NODE_ENV === 'test';

const docClient = isTest
  ? new AWS.DynamoDB.DocumentClient(localOptions)
  : new AWS.DynamoDB.DocumentClient(options);

export const db = docClient;

export const getTableName = (table) => {
  if (process.env.NODE_ENV === 'development') {
    return `beta-${table}`;
  }
  return `${process.env.NODE_ENV}-${table}`;
};
