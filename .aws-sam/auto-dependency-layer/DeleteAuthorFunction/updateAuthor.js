const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { authorId } = event.pathParameters;
    const { name, lastName, birthDate, rut } = JSON.parse(event.body);

    const params = {
        TableName: process.env.AUTHORS_TABLE,
        Key: {
            authorId,
        },
        UpdateExpression: 'set name = :name, lastName = :lastName, birthDate = :birthDate, rut = :rut',
        ExpressionAttributeValues: {
            ':name': name,
            ':lastName': lastName,
            ':birthDate': birthDate,
            ':rut': rut,
        },
        ReturnValues: 'UPDATED_NEW',
    };

    await dynamoDB.update(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Author updated successfully!' }),
    };
};