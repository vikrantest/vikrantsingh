var express = require('express'),
	app = express();
var http = require('http').Server(app);

http.listen(8800, function(){
  console.log('listening on *:8800..........................');
});

app.use('/static', express.static('static'));


app.get('/',function(req,res){
	res.sendFile(__dirname+'/static/templates/index.html')
});

app.post('/mail/contact_me',function(req,res){
	console.log(req.query);
	res.send({'contact_mail':'success'}).status(200);
});

