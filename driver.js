'use strict'

// event object to be passed to lambda function
const event = {
};

// AWS Lambda's runtime information
const context = {
  functionName: process.env.FUNCTION_NAME,
  done: (err, message) => {
    console.log('done');
  }
};

const lambda = require('./');
lambda.handler(event, context);
