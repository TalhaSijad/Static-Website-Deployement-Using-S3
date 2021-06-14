const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  }; 

  try {
    switch (event.routeKey) {
      case "DELETE /names/{id}":
        await dynamo
          .delete({
            TableName: "Names",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        body = `Deleted name ${event.pathParameters.id}`;
        break;
      case "GET /names/{id}":
        body = await dynamo
          .get({
            TableName: "Names",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        break;
      case "GET /names":
        body = await dynamo.scan({ TableName: "Names" }).promise();
        break;
      case "PUT /names":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "Names",
            Item: {
              id: requestJSON.id,
              name: requestJSON.name
            }
          })
          .promise();
        body = `Put name ${requestJSON.id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};