const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  }; 

  // try {
  //   switch (event.routeKey) {
  //     case "DELETE /items/{id}":
  //       await dynamo
  //         .delete({
  //           TableName: "Names",
  //           Key: {
  //             id: event.pathParameters.id
  //           }
  //         })
  //         .promise();
  //       body = `Deleted item ${event.pathParameters.id}`;
  //       break;
  //     case "GET /items/{id}":
  //       body = await dynamo
  //         .get({
  //           TableName: "Names",
  //           Key: {
  //             id: event.pathParameters.id
  //           }
  //         })
  //         .promise();
  //       break;
  //     case "GET /items":
  //       body = await dynamo.scan({ TableName: "Names" }).promise();
  //       break;
  //     case "PUT /items":
  //       let requestJSON = JSON.parse(event.body);
  //       await dynamo
  //         .put({
  //           TableName: "Names",
  //           Item: {
  //             id: requestJSON.id,
  //             price: requestJSON.price,
  //             name: requestJSON.name
  //           }
  //         })
  //         .promise();
  //       body = `Put item ${requestJSON.id}`;
  //       break;
  //     default:
  //       throw new Error(`Unsupported route: "${event.routeKey}"`);
  //   }
  // } catch (err) {
  //   statusCode = 400;
  //   body = err.message;
  // } finally {
  //   body = JSON.stringify(body);
  // }

  try {
    switch (event.routeKey) {
      case "GET /names":
        body = 'You called the GET method';
        break;
      case "GET /names/{id}":
        body = 'You called the GET/{id} method';
        break;
      case "PUT /names":
        body = 'You called the PUT method';
        break;
      // case "PUT /items":
      //   let requestJSON = JSON.parse(event.body);
      //   await dynamo
      //     .put({
      //       TableName: "Names",
      //       Item: {
      //         id: requestJSON.id,
      //         price: requestJSON.price,
      //         name: requestJSON.name
      //       }
      //     })
      //     .promise();
      //   body = `Put item ${requestJSON.id}`;
      //   break;
      default:
        throw new Error(`imvalid route: "${event.routeKey}"`);
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