const AWS = require('aws-sdk');
const client = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

module.exports.helloWorld = (event, context, callback) => {
  let scanningParams = {
    TableName: 'Names'
  }

  client.scan(scanningParams, function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};
