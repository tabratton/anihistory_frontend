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
      region: process.env.AWS_REGION,
      allowOverwrite: true
    },
    s3: {
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      bucket: process.env.AWS_BUCKET,
      region: process.env.AWS_REGION
    },
    cloudfront: {
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      region: process.env.AWS_REGION,
      distribution: process.env.AWS_DIST
    }
  };
};
