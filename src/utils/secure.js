import ServerError from './ServerError';

export default func => (root, args, context) => {
  if (!context.user) {
    throw new ServerError(403, 'You are not allowed to access this resource');
  }
  return func(root, args, context);
};
