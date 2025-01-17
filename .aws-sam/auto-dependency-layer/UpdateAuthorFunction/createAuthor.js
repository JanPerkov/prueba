const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid'); 
const Ajv = require('ajv');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const ajv = new Ajv();

const authorSchema = {
    type: "object",
    properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        birthDate: { type: "string" },
        rut: { type: "string"}
    },
    required: ["firstName", "lastName", "birthDate", "rut"],
    additionalProperties: false
};

exports.handler = async (event) => {
    const { firstName, lastName, birthDate, rut } = JSON.parse(event.body);

    const validate = ajv.compile(authorSchema);
    const valid = validate({ firstName, lastName, birthDate, rut });
    if (!valid) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Error de validación', errors: validate.errors }),
        };
    }
    const authorId = uuidv4();
    const params = {
        TableName: process.env.AUTHORS_TABLE,
        Item: {
            authorId,
            firstName,
            lastName,
            birthDate,
            rut,
            createdAt: new Date().toISOString(),
        },
    };

    await dynamoDB.put(params).promise();

    return {
        statusCode: 201,
        body: JSON.stringify({ message: 'Author created successfully!' }),
    };
};