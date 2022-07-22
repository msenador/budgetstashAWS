const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');

AWS.config.update({
  region: process.env.AWS_MY_REGION
});

var dynamoDB = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const dynamoDBtable = process.env.DYNAMODB_TABLE;

exports.handler = async (event) => {
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

  return getUser(body.email, body.password);
};

const missingInputs = (email, password) => {
  if (!email || !password) {
    return true;
  }
};

const getUser = async (email, password) => {
  try {
    const params = {
      Key: {
        email: { S: email }
      },
      TableName: dynamoDBtable
    };

    const result = await dynamoDB.getItem(params).promise();

    if (result.Item.email.S === email && bcrypt.compareSync(password, result.Item.password.S)) {
      console.log('FOUND user:');
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(result)
      };
    } else {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(`Email or password is incorrect`)
      };
    }
  } catch (error) {
    if (error) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(`Email or password is incorrect`)
      };
    }
  }
};
