const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient({ region: process.env.AWS_MY_REGION });
const dynamoDBtable = process.env.DYNAMODB_TABLE;

exports.handler = async (event) => {
  console.log(event);
  const body = JSON.parse(event.body);

  return await deleteItem(body.email, body.monthSelected, body.index);
};

const deleteItem = async (email, monthSelected, index) => {
  await docClient
    .update({
      TableName: dynamoDBtable,
      Key: {
        email: email
      },
      UpdateExpression: `REMOVE #${monthSelected}[${index}]`,
      ExpressionAttributeNames: {
        [`#${monthSelected}`]: [monthSelected]
      }
    })
    .promise();

  const response = await docClient
    .query({
      TableName: dynamoDBtable,
      ExpressionAttributeNames: {
        '#email': 'email'
      },
      ExpressionAttributeValues: {
        ':emailValue': email
      },
      KeyConditionExpression: '#email = :emailValue'
    })
    .promise();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify(response)
  };
};
