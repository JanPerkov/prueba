const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const bookIds = JSON.parse(event.body).ids; 

    if (!Array.isArray(bookIds) || bookIds.length === 0) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Se requiere un array de IDs de libros.' }),
        };
    }

    const deleteRequests = bookIds.map(id => ({
        DeleteRequest: {
            Key: {
                bookId: id,
            },
        },
    }));

    const params = {
        RequestItems: {
            'Books': deleteRequests,
        },
    };

    try {
        await dynamoDB.batchWrite(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Libros eliminados exitosamente.' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al eliminar los libros.', error }),
        };
    }
};