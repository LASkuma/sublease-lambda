import AWS from 'aws-sdk';

import globalConfig from '../../configs/config.global.json';
import config from '../../config';

import ServerError from '../utils/ServerError';

const cognito = new AWS.CognitoIdentityServiceProvider({ region: globalConfig.AwsRegion });

export default class User {
  static async create(email) {
    const tempPassDigits = Math.floor(Math.random() * 900000) + 100000;
    const TemporaryPassword = tempPassDigits.toString();

    const params = {
      UserPoolId: config.UserPool,
      Username: email,
      TemporaryPassword,
    };

    try {
      await cognito.adminCreateUser(params).promise();
      return 'Register Succeed. Check your mailbox to proceed.';
    } catch (err) {
      throw ServerError.ErrorBuilder(400, err);
    }
  }
}
