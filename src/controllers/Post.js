import uuid from 'uuid-random';

import LeaseFactory from '../models/Lease';
import ServerError from '../utils/ServerError';
import * as posts from '../connectors/posts';

export default class Post {
  static async create(leaseInput, { id }) {
    try {
      const lease = await LeaseFactory.create(leaseInput);

      lease.from = lease.from.getTime();
      lease.to = lease.to.getTime();

      const post = {
        id: uuid(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        user: id,
        status: 'Active',
        ...lease,
      };

      await Promise.all([posts.create(post), posts.publish(post)]);
      return post;
    } catch (err) {
      throw ServerError.ErrorBuilder(500, err);
    }
  }

  static async readAll() {
    try {
      return await posts.readAll();
    } catch (err) {
      throw ServerError.ErrorBuilder(500, err);
    }
  }

  static async readById(id) {
    try {
      return await posts.readById(id);
    } catch (err) {
      throw ServerError.ErrorBuilder(500, err);
    }
  }
}
