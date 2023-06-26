const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const port = process.env.PORT || 8080
//var FCM = require('fcm-push');

//var serverKey = 'AAAAx2cVVfc:APA91bEqmqbEZwswltWBPCg2F-J0QiN7ALRm31xAEzecuQ8l_RUADb6BSHY2fKpvaxciErOyI73yiBIuF3vcH_YyfI7IZlNDltzUI_9pFQ8gmrBXlqqysPo6tEOjLkXBwUcvEvJ_QPJQ';
//var fcm = new FCM(serverKey);
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.post('/bandyer', (req, res) => {
    var retRes= {"Status" :"Ok"};
    var bodyReq  = req.body; 
	var headers  = req.headers;
	var roomIdHmac  = req.headers["room-id-hmac"];
	var bandyerSignature  = req.headers["bandyer-signature"];
	const success = myCache.mset([
		{key: "myKey1", val: bodyReq,  ttl: 60000},
		{key: "myKey2", val: roomIdHmac, ttl: 60000},
		{key: "myKey3", val: bandyerSignature, ttl: 60000},
	]);
	console.log("Request ...myCache status ==",JSON.stringify(success));
        console.log("Request ...Body = ",bodyReq);	
        console.log("Request ...roomIdHmac= ",roomIdHmac);
	console.log("Request ...bandyerSignature= ",bandyerSignature);
	setTimeout(function() {
		console.log("Waiting......");	
    }, 60*1000);
	
    res.send(retRes);	  
});
app.listen(port, () => console.log('Running...Ezak..Application Now='+Date()))
