const express = require('express'),
	nodemailer = require('nodemailer'),
	bodyParser = require('body-parser'),
	app = express();
const http = require('http').Server(app);

http.listen(8800, function(){
  console.log('listening on *:8800..........................');
});

app.use('/static', express.static('static'));
app.use(bodyParser.json());


app.get('/',function(req,res){
	res.sendFile(__dirname+'/static/templates/index.html')
});

app.post('/mail/contact_me',function(req,res){
	console.log(req.body);
	let req_data = req.body;
	let transporter = nodemailer.createTransport({
	 service: 'gmail',
	 auth: {
			user: 'vikrant@vikrantsingh.xyz',
			pass: '!@#singh1990'
		}
	});
	const mailOptions = {
		from: 'vikrant@vikrantsingh.com', 
		to: req_data.email, 
		subject: req_data.name, 
		html: req_data.message
	};
	//fix handler with proper status
	transporter.sendMail(mailOptions, function (err, info) {
		if(err)
			console.log(err)
		else
			console.log(info);
	});
	res.send({'contact_mail':'success'}).status(200);
});

