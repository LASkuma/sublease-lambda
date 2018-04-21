import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

import config from '../../config';

const iss = `https://cognito-idp.${config.USER_POOL_REGION}.amazonaws.com/${config.USER_POOL}`;

export default function getUser(token) {
  return new Promise((resolve) => {
    if (!token) {
      resolve(undefined);
      return;
    }

    const decoded = jwt.decode(token, { json: true, complete: true });

    if (!decoded || decoded.payload.iss !== iss || decoded.payload.token_use !== 'id') {
      resolve(undefined);
      return;
    }

    const { kid } = decoded.header;
    const jwk = config.jwks.find(current => current.kid === kid);
    const pem = jwkToPem(jwk);

    jwt.verify(token, pem, (err, result) => {
      if (err) {
        resolve(undefined);
        return;
      }
      const now = new Date().getTime() / 1000;
      if (now > result.exp) {
        resolve(undefined);
        return;
      }

      console.log(result);

      resolve(result);
    });
  });
}