const secure = require('../secure').default;

describe('Secure', () => {
  it('should run properly if user is in context', () => {
    expect(secure(() => 'hi')(null, null, { user: { storeID: '10001' } })).toBe('hi');
  });

  it('should throw error if user is not specified', () => {
    expect(() => secure(() => 'hi')(null, null, {})).toThrow(
      'You are not allowed to access this resource',
    );
  });
});
