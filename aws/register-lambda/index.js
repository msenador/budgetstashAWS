const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');

AWS.config.update({
  region: process.env.AWS_MY_REGION
});

var dynamoDB = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const dynamoDBtable = process.env.DYNAMODB_TABLE;

exports.handler = async (event) => {
  console.log(event);
  const body = JSON.parse(event.body);

  if (missingInputs(body.username, body.email, body.password, body.confirmPassword) === true) {
    const response = {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(`All fields are required`)
    };
    return response;
  } else if (passwordsDoNotMatch(body.password, body.confirmPassword) === true) {
    const response = {
      statusCode: 402,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(`Passwords do not match`)
    };
    return response;
  } else if ((await userExists(body.email)) === true) {
    const response = {
      statusCode: 409,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify('Email address already exists.')
    };
    return response;
  } else {
    return await addUser(body.username, body.email, body.password);
  }
};

const missingInputs = (username, email, password, confirmPassword) => {
  if (!username || !email || !password || !confirmPassword) {
    return true;
  }
};

const passwordsDoNotMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return true;
  }
};

const userExists = async (email) => {
  try {
    const params = {
      Key: {
        email: { S: email }
      },
      TableName: dynamoDBtable
    };

    const result = await dynamoDB.getItem(params).promise();
    console.log(JSON.stringify(result));

    if (result.Item) {
      console.log('RESULT.ITEM: ', result.Item);
      return true;
    }
  } catch (error) {
    console.error(error);
  }
};

const addUser = async (username, email, password) => {
  const encryptedPW = bcrypt.hashSync(password.trim(), 10);

  const user = {
    username: username,
    email: email,
    password: encryptedPW
  };

  const params = {
    TableName: dynamoDBtable,
    Item: {
      username: { S: user.username },
      email: { S: user.email },
      password: { S: user.password },
      January: { L: [] },
      February: { L: [] },
      March: { L: [] },
      April: { L: [] },
      May: { L: [] },
      June: { L: [] },
      July: { L: [] },
      August: { L: [] },
      September: { L: [] },
      October: { L: [] },
      November: { L: [] },
      December: { L: [] }
    }
  };

  await dynamoDB
    .putItem(params, (err, data) => {
      if (err) {
        console.log('Error while adding items to database: ', err);
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
    body: JSON.stringify('Registration Successful')
  };
  return response;
};
