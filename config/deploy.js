/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
  return {
    build: {
      environment: deployTarget
    },
    's3-index': {
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      bucket: process.env.AWS_BUCKET,
      region: 'us-east-1',
      allowOverwrite: true
    },
    s3: {
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      bucket: process.env.AWS_BUCKET,
      region: 'us-east-1'
    },
    cloudfront: {
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      region: 'us-east-1',
      distribution: process.env.AWS_DIST
    }
  };
};