import Joi from 'joi';

import ServerError from '../utils/ServerError';

const states = [
  'Alaska',
  'Alabama',
  'Arkansas',
  'American Samoa',
  'Arizona',
  'California',
  'Colorado',
  'Connecticut',
  'District of Columbia',
  'Delaware',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Iowa',
  'Idaho',
  'Illinois',
  'Indiana',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Massachusetts',
  'Maryland',
  'Maine',
  'Michigan',
  'Minnesota',
  'Missouri',
  'Mississippi',
  'Montana',
  'North Carolina',
  'North Dakota',
  'Nebraska',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'Nevada',
  'New York',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Virginia',
  'Virgin Islands',
  'Vermont',
  'Washington',
  'Wisconsin',
  'West Virginia',
  'Wyoming',
];

const schema = Joi.object().keys({
  address: Joi.string().required(),
  building: Joi.string().optional(),
  state: Joi.string()
    .valid(states)
    .required(),
  city: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  from: Joi.date().required(),
  to: Joi.date()
    .min(Joi.ref('from'))
    .optional(),
  bedrooms: Joi.number()
    .integer()
    .min(0)
    .required(),
  bathrooms: Joi.number()
    .integer()
    .min(1)
    .optional(),
  type: Joi.string()
    .valid(['Bedroom', 'Livingroom'])
    .required(),
});

class Lease {
  constructor(lease) {
    Object.keys(lease).forEach((key) => {
      this[key] = lease[key];
    });
  }
}

export default class LeaseFactory {
  static async create(lease) {
    try {
      const result = await Joi.validate(lease, schema);
      return new Lease(result);
    } catch (err) {
      throw ServerError.ErrorBuilder(400, err);
    }
  }
}

const env = process.env.NODE_ENV;
exports.Lease = env === 'test' ? Lease : undefined;
