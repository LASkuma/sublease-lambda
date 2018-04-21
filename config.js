import configs from './configs/config.env.json';

let env = process.env.NODE_ENV || 'development';
if (env === 'test') {
  env = 'development';
}

export default configs[env];
