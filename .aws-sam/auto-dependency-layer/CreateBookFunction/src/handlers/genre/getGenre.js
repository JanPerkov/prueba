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

    const result = await dynamoDB.get(params).promise();

    if (!result.Item) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Genre not found' }),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(result.Item),
    };
};