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
  const today = new Date();
  const dateEST = new Date(today.getTime() + -240 * 60 * 1000);
  const dateToString = dateEST.toString();
  const splitDateToString = dateToString.split('');
  const realEST = splitDateToString.slice(0, 24).join('');

  const user = {
    email: email,
    subject: subject,
    message: message,
    timestamp: realEST
  };

  const params = {
    TableName: dynamoDBtable,
    Item: {
      email: { S: user.email },
      subject: { S: user.subject },
      message: { S: user.message },
      timestamp: { S: user.timestamp }
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
