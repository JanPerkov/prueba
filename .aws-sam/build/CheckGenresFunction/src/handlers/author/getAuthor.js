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

    const result = await dynamoDB.get(params).promise();

    if (!result.Item) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Author not found' }),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(result.Item),
    };
};