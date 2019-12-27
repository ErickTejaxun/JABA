var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
var quequeURL = "https://sqs.us-east-2.amazonaws.com/728237696908/cola-microservicios";

var params = 
{
     AttributeNames: [
          "SentTimestamp"
     ],
     MaxNumberOfMessages: 1,
     MessageAttributeNames:
     [
          "All"
     ],
     QueueUrl : quequeURL,
     VisibilityTimeout: 0,
     WaitTimeSeconds: 0
};

exports.handler = (event, context, callback) =>
{
     sqs.receiveMessage(params, function(err, data)
     {
          console.log("Data: " + JSON.stringify(data));
          if(err)
          {
               console.log("Error encontrado ",err);
               callback(err, "Error en mensaje de SQS");
          }
          else if(data.Messages)
          {
               console.log("Numero de mensajes recibidos : " + data.Messages.length);
               console.log("Mensaje recibido : " + JSON.stringify(data.Messages[0]));
               console.log("Cuerpo del mensaje: "+data.Messages[0].Body);
               var deleteParams = 
               {
                    QueueUrl: quequeURL,
                    ReceipHandle : data.Messages[0].ReceipHandle
               }
          }
     });
}