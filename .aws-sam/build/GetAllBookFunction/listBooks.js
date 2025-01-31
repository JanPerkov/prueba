const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
    const params = {
        TableName: process.env.BOOKS_TABLE,
    };

    const result = await dynamoDB.scan(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(result.Items),
    };
};