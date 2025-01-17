const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { genreId } = event.pathParameters;

    const params = {
        TableName: process.env.GENRES_TABLE,
        Key: {
            genreId,
        },
    };

    await dynamoDB.delete(params).promise();

    return {
        statusCode: 204,
        body: null,
    };
};