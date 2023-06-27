const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const port = process.env.PORT || 8080
var NodeCache = require( "node-cache" );
const myCache = new NodeCache();
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
	console.log("Request ...myCache status ==",success);
	console.log("Request ...myCache status ==",JSON.stringify(bodyReq));
        console.log("Request ...Body = ",bodyReq);	
        console.log("Request ...roomIdHmac= ",roomIdHmac);
	console.log("Request ...bandyerSignature= ",bandyerSignature);	
	setTimeout(function() {
		console.log("Waiting......");	
    }, 60*1000);
    res.send(retRes);	  
});

app.post('/getcache', (req, res) => {
    var retRes= myCache.get( "myKey1" );
	res.setHeader("room-id-hmac", myCache.get( "myKey2" ));
	res.setHeader("bandyer-signature", myCache.get( "myKey3" ));	
    res.send(retRes);	  
});

app.post('/clearcache', (req, res) => {
    const success = myCache.mset([
		{key: "myKey1", val: ""},
		{key: "myKey2", val: ""},
		{key: "myKey3", val: ""},
	]);	
	var retRes= {"Status" :success};
    res.send(retRes);	  
});

app.post('/', (req, res) => {
    var retRes= {"Status" :"Ok"};   
    res.send(retRes);	  
});
app.listen(port, () => console.log('Running...Ezak..Application Now='+Date()))
