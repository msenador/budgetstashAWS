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

  if (missingInputs(body.itemName, body.itemPrice, body.category)) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(`Item name, price, and category are required`)
    };
  }

  await addItem(
    body.itemName,
    body.itemPrice,
    body.category,
    body.email,
    body.monthSelected,
    month,
    day,
    hours,
    minutes
  )
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

const missingInputs = (itemName, itemPrice, category) => {
  if (!itemName || !itemPrice || !category) {
    return true;
  }
};

const addItem = (itemName, itemPrice, category, email, monthSelected) => {
  const dateEST = new Date(today.getTime() + -240 * 60 * 1000);
  const dateToString = dateEST.toString();
  const splitDateToString = dateToString.split('');
  const realEST = splitDateToString.slice(0, 24).join('');

  const itemDetails = {
    itemName: itemName,
    itemPrice: itemPrice,
    date: `${realEST}`,
    category: category.toLowerCase(),
    monthSelected: monthSelected
  };

  return docClient
    .update({
      TableName: dynamoDBtable,
      Key: {
        email: email
      },
      UpdateExpression: `set #${monthSelected} = list_append(if_not_exists(#${monthSelected}, :empty_list), :itemDetails)`,
      ExpressionAttributeNames: {
        [`#${monthSelected}`]: [monthSelected]
      },
      ExpressionAttributeValues: {
        ':itemDetails': [itemDetails],
        ':empty_list': []
      }
    })
    .promise();
};
