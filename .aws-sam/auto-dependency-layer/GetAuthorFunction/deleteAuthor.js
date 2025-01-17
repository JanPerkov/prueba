const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { authorId } = event.pathParameters;

    const params = {
        TableName: process.env.AUTHORS_TABLE,
        Key: {
            authorId,
        },
    };

    await dynamoDB.delete(params).promise();

    return {
        statusCode: 204,
        body: null,
    };
};