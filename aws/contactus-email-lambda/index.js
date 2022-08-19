const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_MY_REGION
});

var dynamoDB = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const dynamoDBtable = process.env.DYNAMODB_TABLE;

exports.handler = async (event) => {
  console.log(event);
  const body = JSON.parse(event.body);

  return await addForm(body.email, body.subject, body.message);
};

const addForm = async (email, subject, message) => {
  const user = {
    email: email,
    subject: subject,
    message: message
  };

  const params = {
    TableName: dynamoDBtable,
    Item: {
      email: { S: user.email },
      subject: { S: user.subject },
      message: { S: user.message }
    }
  };

  await dynamoDB
    .putItem(params, (err, data) => {
      if (err) {
        console.log('Error while adding items to emails database: ', err);
      } else {
        console.log('Success', data);
      }
    })
    .promise();

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify('Form added')
  };
  return response;
};
