const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { genreId } = event.pathParameters;
    const { name } = JSON.parse(event.body);

    const params = {
        TableName: process.env.GENRES_TABLE,
        Key: {
            genreId,
        },
        UpdateExpression: 'set name = :name',
        ExpressionAttributeValues: {
            ':name': name,
        },
        ReturnValues: 'UPDATED_NEW',
    };

    await dynamoDB.update(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Genre updated successfully!' }),
    };
};