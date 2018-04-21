/* eslint-disable import/prefer-default-export */
import * as server from 'apollo-server-lambda';

import eventHandler from './src/apollo/eventHandler';

export const graphqlHandler = (event, context, callback) => {
  const callbackFilter = (error, output) => {
    // eslint-disable-next-line no-param-reassign
    output.headers['Access-Control-Allow-Origin'] = '*';
    callback(error, output);
  };
  const handler = server.graphqlLambda(eventHandler);

  return handler(event, context, callbackFilter);
};

export const graphiqlHandler = server.graphiqlLambda({
  endpointURL: 'graphql',
});
