import getUser from './getUser';
import schema from '../graphql/schema';

export default async function (event) {
  const { headers } = event;
  const token = headers.Authorization;

  const user = await getUser(token);

  return {
    schema,
    context: {
      user,
    },
    formatError(error) {
      if (error.originalError) {
        // eslint-disable-next-line no-param-reassign
        error.statusCode = error.originalError.statusCode;
      }
      return error;
    },
  };
}
