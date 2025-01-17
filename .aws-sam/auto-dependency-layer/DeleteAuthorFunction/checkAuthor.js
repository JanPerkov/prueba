const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const authorId = event.authorId; // Suponiendo que el authorId se pasa en el evento

    const params = {
        TableName: process.env.AUTHORS_TABLE,
        Key: {
            authorId: authorId
        }
    };

    const result = await docClient.get(params).promise();
    return {
        authorExists: !!result.Item // Devuelve true si el autor existe
    };
};