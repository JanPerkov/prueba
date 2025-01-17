const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid'); 
const stepFunctions = new AWS.StepFunctions();

exports.handler = async (event) => {
    const { bookTitle, authorId, genres, bookCode, publishedDate } = JSON.parse(event.body); 

   
    const bookId = uuidv4();
    const params = {
        stateMachineArn: process.env.STATE_MACHINE_ARN, 
        input: JSON.stringify({
            authorId,
            genreIds: genres, 
            bookDetails: {
                bookId,
                bookCode, 
                bookTitle,
                publishedDate,
                createdAt: new Date().toISOString(),
            }
        })

    };

    try {
        // Iniciar la ejecución de la máquina de estado
        const result = await stepFunctions.startExecution(params).promise();
        return {
            statusCode: 202, // Aceptado, pero en proceso
            body: JSON.stringify({ message: 'Book creation in progress', executionArn: result.executionArn }),
        };
    } catch (error) {
        console.error("Error starting Step Functions execution:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error starting book creation process', error: error.message }),
        };
    }
};