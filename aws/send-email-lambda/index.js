const AWS = require('aws-sdk');

const SES = new AWS.SES();

exports.handler = async (event) => {
  console.log('event', event);

  const body = JSON.parse(event.body);

  const params = {
    Destination: {
      ToAddresses: [process.env.BUDGETSTASH_EMAIL]
    },
    Message: {
      Body: {
        Text: { Data: `From: ${body.email}\n\n${body.message}` }
      },
      Subject: { Data: `${body.subject}` }
    },
    Source: process.env.BUDGETSTASH_EMAIL
  };

  try {
    await SES.sendEmail(params).promise();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(`Email sent`)
    };
  } catch (error) {
    console.log('error sending email ', error);
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(`Email failed`)
    };
  }
};
