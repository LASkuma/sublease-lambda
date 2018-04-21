const ServerError = require('../ServerError');

describe('ServerError', () => {
  test('new ServerError should contain specified statusCode and message', () => {
    const se = new ServerError(888, 'hello guys');
    expect(se.statusCode).toBe(888);
    expect(se.message).toEqual('hello guys');
  });
});

describe('ErrorBuilder', () => {
  test('should return original status code if ServerError is passed in', () => {
    const se = new ServerError(888, 'hi guys');
    const newSE = ServerError.ErrorBuilder(500, se);
    expect(newSE.statusCode).toBe(888);
  });

  test('should return preferred statusCode if native Error is passed in', () => {
    expect(ServerError.ErrorBuilder(505, new Error('wow')).statusCode).toBe(505);
  });

  test('should return original error message', () => {
    const se = new ServerError(888, 'hi guys');
    const err = new Error('hello guys');

    expect(ServerError.ErrorBuilder(500, se).message).toBe('hi guys');
    expect(ServerError.ErrorBuilder(500, err).message).toBe('hello guys');
  });
});
