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

  await addItem(body.itemName, body.itemPrice, body.email)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const addItem = (itemName, itemPrice, email) => {
  const currentMonth = convertMonth(month);
  const itemDetails = {
    itemName: itemName,
    itemPrice: itemPrice,
    date: `${month + 1}/${day} - ${hours - 4}:${minutes + 1}`
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

// const query = async () => { //USE THIS INSTEAD OF SCAN. ITS FASTER AND MORE COST EFFECTIVE.
//   console.log('indside func');
//   const response = await documentClient
//     .query({
//       TableName: dynamoDBtable,
//       ExpressionAttributeNames: {
//         '#email': 'email'
//       },
//       ExpressionAttributeValues: {
//         ':emailValue': 'test@yahoo.com'
//       },
//       KeyConditionExpression: '#email = :emailValue'
//     })
//     .promise();

//   console.log(`Query response: ${JSON.stringify(response, null, 2)}`);
// };
// await query().catch((error) => console.error(JSON.stringify(error, null, 2))); //USE THIS INSTEAD OF SCAN. ITS FASTER AND MORE COST EFFECTIVE.
