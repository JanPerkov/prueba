const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { bookId } = event.pathParameters;

    const params = {
        TableName: process.env.BOOKS_TABLE,
        Key: {
            bookId,
        },
    };

    await dynamoDB.delete(params).promise();

    return {
        statusCode: 204,
        body: null,
    };
};