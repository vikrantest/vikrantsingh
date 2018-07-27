const express = require('express'),
	nodemailer = require('nodemailer'),
	bodyParser = require('body-parser'),
	app = express();
const http = require('http').Server(app),
	sender_details = {email:'vikrant@vikrantsingh.xyz',password:'!@#singh1990'},
	receiver = 'mainbox@vikrantsingh.xyz';

http.listen(8800, function(){
  console.log('listening on *:8800..........................');
});

app.use('/static', express.static('static'));
app.use(bodyParser.json());


app.get('/',function(req,res){
	res.sendFile(__dirname+'/static/templates/index.html')
});

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

app.post('/mail/contact_me',function(req,res){
	let req_data = req.body;
	let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
			user: sender_details.email,
			pass: sender_details.password
		}
	});
	let mail_body = req_data.message+"\n \n \n ---- Headers--> \n"+JSON.stringify(req.headers);
	const message = 'Name - '+req_data.name+' | Email - '
	const mailOptions = {
		from: sender_details.email, 
		to: receiver, 
		subject: message,
		html: mail_body
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

