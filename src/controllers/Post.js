import uuid from 'uuid-random';

import LeaseFactory from '../models/Lease';
import ServerError from '../utils/ServerError';

export default class Post {
  static async create(leaseInput) {
    try {
      const lease = await LeaseFactory.create(leaseInput);
      const post = {
        id: uuid(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        user: 1,
        status: 'Active',
        ...lease,
      };
      return post;
    } catch (err) {
      throw ServerError.ErrorBuilder(500, err);
    }
  }
}
