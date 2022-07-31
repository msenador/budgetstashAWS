const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');

AWS.config.update({
  region: process.env.AWS_MY_REGION
});

const dynamoDBtable = process.env.DYNAMODB_TABLE;
const documentClient = new AWS.DynamoDB.DocumentClient({ region: process.env.AWS_MY_REGION });

exports.handler = async (event) => {
  console.log(event);
  const body = JSON.parse(event.body);

  if (missingInputs(body.email, body.password) === true) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(`All fields are required`)
    };
  }

  return await getUser(body.email, body.password);
};

const missingInputs = (email, password) => {
  if (!email || !password) {
    return true;
  }
};

const getUser = async (email, inputPassword) => {
  const response = await documentClient
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

  if (response.Items.length === 0) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify('User not found')
    };
  }

  console.log('RESPONSE: ', response);
  const encryptedPW = response.Items[0].password;

  if (bcrypt.compareSync(inputPassword, encryptedPW) === false) {
    return {
      statusCode: 402,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify('Incorrect email or password')
    };
  }

  if (bcrypt.compareSync(inputPassword, encryptedPW) === true) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(response)
    };
  }
};
