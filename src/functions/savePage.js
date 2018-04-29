import AWS from 'aws-sdk';
import config from '../../config';

export default async function savePage({ html, post }) {
  const s3 = new AWS.S3({ region: 'us-east-1' });

  return s3
    .putObject({
      ACL: 'public-read',
      Body: html,
      Bucket: config.AppBucket,
      ContentType: 'text/html',
      Key: `posts/${post.id}`,
    })
    .promise();
}
