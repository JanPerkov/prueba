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

    const result = await dynamoDB.get(params).promise();

    if (!result.Item) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Book not found' }),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(result.Item),
    };
};