const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid'); 
const Ajv = require('ajv');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const ajv = new Ajv();

const genreSchema = {
    type: "object",
    properties: {
        genreName: { type: "string" }
    },
    required: ["genreName"],
    additionalProperties: false
};
exports.handler = async (event) => {
    const { genreName } = JSON.parse(event.body);
    const validate = ajv.compile(genreSchema);
    const valid = validate({ genreName });
    if (!valid) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Error de validación', errors: validate.errors }),
        };
    }
    const genreId = uuidv4();
    const params = {
        TableName: process.env.GENRES_TABLE,
        Item: {
            genreId,
            genreName,
            createdAt: new Date().toISOString(),
        },
    };

    await dynamoDB.put(params).promise();

    return {
        statusCode: 201,
        body: JSON.stringify({ message: 'Genre created successfully!' }),
    };
};