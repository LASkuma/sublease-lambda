jest.mock('uuid-random', () => () => 1);

const LeaseFactory = require('../../models/Lease').default;
const Post = require('../Post').default;

describe('Post controller', () => {
  it('should insert id, user, createdAt, status, etc.', async () => {
    LeaseFactory.create = jest.fn().mockResolvedValue({});
    Date.now = jest.fn().mockReturnValue(100000);

    expect.assertions(1);

    const result = await Post.create({}, { id: 101 });
    expect(result).toMatchSnapshot();
  });
});
