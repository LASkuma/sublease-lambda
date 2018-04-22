const LeaseFactory = require('../Lease').default;
const { Lease } = require('../Lease');

describe('Lease Model', () => {
  it('should fail Validation', async () => {
    expect.assertions(1);

    expect(LeaseFactory.create({})).rejects.toThrowErrorMatchingSnapshot();
  });

  it('should return Lease object when validation is passed', async () => {
    expect.assertions(2);

    const result = await LeaseFactory.create({
      address: '808 Columbus Ave',
      state: 'New York',
      city: 'New York',
      description: 'Very nice room',
      price: 1300,
      from: new Date('2018-05-01'),
      bedrooms: 3,
      bathrooms: 1,
      type: 'Bedroom',
      pictureId: '1',
      pictureNumber: 5,
    });

    expect(result).toBeInstanceOf(Lease);
    expect(result).toMatchSnapshot();
  });
});
