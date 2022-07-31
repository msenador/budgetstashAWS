// THIS LAMBDA DOES NOT ADD CATEGORIES. IT ADDS ITEMS.
// CONNECTED TO add-item-budgetstash LAMBDA.
const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient({ region: process.env.AWS_MY_REGION });
const dynamoDBtable = process.env.DYNAMODB_TABLE;

const today = new Date();
const day = today.getDate(); // 24
const month = today.getMonth(); // 10 (Month is 0-based, so 10 means 11th Month)
// const year = today.getFullYear();
const hours = today.getHours(); // 15 (0-23)
const minutes = today.getMinutes(); // 20 (0-59)

exports.handler = async (event) => {
  console.log(event);
  const body = JSON.parse(event.body);

  if (missingInputs(body.itemName, body.itemPrice)) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(`Item name and price is required`)
    };
  }

  await addItem(body.itemName, body.itemPrice, body.email, month, day, hours, minutes)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify(`Item added`)
  };
};

const missingInputs = (itemName, itemPrice) => {
  if (!itemName || !itemPrice) {
    return true;
  }
};

const addItem = (itemName, itemPrice, email, month) => {
  const currentMonth = convertMonth(month);
  const dateEST = new Date(today.getTime() + -240 * 60 * 1000);
  const dateToString = dateEST.toString();
  const splitDateToString = dateToString.split('');
  const realEST = splitDateToString.slice(0, 24).join('');

  const itemDetails = {
    itemName: itemName,
    itemPrice: itemPrice,
    date: `${realEST}` //TODO single digits should have a 0 in front of it.
  };

  return docClient
    .update({
      TableName: dynamoDBtable,
      Key: {
        email: email
      },
      UpdateExpression: `set #${currentMonth} = list_append(if_not_exists(#${currentMonth}, :empty_list), :itemDetails)`,
      ExpressionAttributeNames: {
        [`#${currentMonth}`]: [currentMonth]
      },
      ExpressionAttributeValues: {
        ':itemDetails': [itemDetails],
        ':empty_list': []
      }
    })
    .promise();
};

const convertMonth = (currentMonth) => {
  switch (currentMonth) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
  }
};
