const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const genreIds = event.genreIds; 

    const params = {
        TableName: process.env.GENRES_TABLE,
        FilterExpression: 'genreId IN (:genreIds)',
        ExpressionAttributeValues: {
            ':genreIds': genreIds
        }
    };

    const result = await docClient.scan(params).promise();
    return {
        genresExist: result.Items.length === genreIds.length 
    };
};