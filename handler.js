'use strict';

const SMOOCH_ACCOUNT_KEY = "";
const SMOOCH_ACCOUNT_SECRET = "";
const SMOOCH_WEBHOOK_SECRET = "";
const TRIGGER_STRING = "";
const SmoochCore = require('smooch-core');

module.exports.smoochWebhookListener = (event, context, callback) => {
  const headers = event.headers;
  const payload = JSON.parse(event.body);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
