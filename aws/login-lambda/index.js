const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_MY_REGION
});

const dynamoDBtable = process.env.DYNAMODB_TABLE;
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
  const params = {
    TableName: dynamoDBtable
  };

  const scanResults = [];
  const items = {};
  do {
    const items = await docClient.scan(params).promise();
    items.Items.forEach((item) => scanResults.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey !== 'undefined');

  console.log('SCAN: ', scanResults);

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    body: JSON.stringify(scanResults)
  };

  return response;
};
