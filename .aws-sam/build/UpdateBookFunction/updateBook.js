const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { bookId } = event.pathParameters;
    const { title, authorId, genres } = JSON.parse(event.body);

    const params = {
        TableName: process.env.BOOKS_TABLE,
        Key: {
            bookId,
        },
        UpdateExpression: 'set title = :title, authorId = :authorId, genres = :genres',
        ExpressionAttributeValues: {
            ':title': title,
            ':authorId': authorId,
            ':genres': genres,
        },
        ReturnValues: 'UPDATED_NEW',
    };

    await dynamoDB.update(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Book updated successfully!' }),
    };
};