const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const port = process.env.PORT || 8080
var FCM = require('fcm-push');

var serverKey = 'AAAAx2cVVfc:APA91bEqmqbEZwswltWBPCg2F-J0QiN7ALRm31xAEzecuQ8l_RUADb6BSHY2fKpvaxciErOyI73yiBIuF3vcH_YyfI7IZlNDltzUI_9pFQ8gmrBXlqqysPo6tEOjLkXBwUcvEvJ_QPJQ';
var fcm = new FCM(serverKey);
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.post('/bandyertesto', (req, res) => {
    
    const  p1  = req.body;    
    console.log("Request ...",req.body);
    var message = {
    to: 'dOjQIeb7TTqHNq1BBIQiRm:APA91bGScyUcCQ3SyeesHnQnBqBbvw7uTVqs_RwKy3-V5Qs8OsDGomCYgUxYIQuN7u_oUEsDF-P6jFENkOJJuPTkdAwoTKR2RIbCIr2-Xl2UQINd_cxijGeWhUce_O6AxhuUz0Ogtr_e', // required fill with device token or topics
    collapse_key: 'your_collapse_key', 
    data: req.body,
    notification: {
        title: 'Bandyer Test',
        body: 'Testing By Esakki'
    }
   };
    //callback style
    fcm.send(message, function(err, response){
         var retRes = {
         "req":req.body,
         "res":"NONE"
         }
   	 if (err) {
     	   console.log("Something has gone wrong!");
           retRes.res=JSON.stringify(err);
           res.send(JSON.stringify(retRes));
	 } else {
           console.log("Successfully sent with response: ", response);
           retRes.res=response;
	   res.send(retRes);
         }
    });    
})

app.listen(port, () => console.log('Running...'))
