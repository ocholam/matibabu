// (function() {
//     var childProcess = require("child_process");
//     var oldSpawn = childProcess.spawn;
//     function mySpawn() {
//         console.log('spawn called');
//         console.log(arguments);
//         var result = oldSpawn.apply(this, arguments);
//         return result;
//     }
//     childProcess.spawn = mySpawn;
// })();

require("bixbyte-frame");

/**
 * MAILGUN EMAIL 
 * DEFINE YOUR API KEY IN A FILE NAMED mailgun.conf in the config directory
 * 
 * the mailgun.conf file in the config directory should look like :
 * 
 * module.exports = {
                    apiKey: "YOUR_MAILGUN_SPECIAL_KEY_GOES_HERE",
                    domain: "mg.YOUR_DOMAIN.TLD"
                 };
 * 
 */
var apiKey = require(`${__dirname}/../config/mailgun.conf`);
var email  = mailgun(apiKey);

/**
 * sendData should be in the format: 
 * 
 * var attch = new mailgun.Attachment({data: filepath, filename: filename});
 * {
		from: 'Excited User <me@samples.mailgun.org>',
		to: 'serobnic@mail.ru',
		subject: 'Hello',
		text: 'Testing some Mailgun awesomness!',
		attachment: attch
	};

	for more, visit https://www.npmjs.com/package/mailgun-js
 */
var sendMail = (sendData) => {

	return new Promise( (resolve,reject) =>{

		email.messages().send(sendData, function (error, body) {
			if(error){
				reject(error);
			}else{
				resolve(body);
			}
		});

	});	
	
};

var mailData = {
					from: `Bixbyte Server Monitor <server_monitor@bixbyte.io>`
					,to: ['server_monitor@bixbyte.io']
					,bcc: ['mbaeian@gmail.com']
					,subject: `Service Started at ${myAddr}:${app.port} `
					,text: `Hello,\n\nYour service running on ${myAddr} port ${app.port} has just been started.\n\nWe hope that you are enjoying the framify experience.\n\nSincerely:\n\tThe Framify team. `
					,html: `<font color="gray"><u><h2>YOUR SERVICE IS UP!</u></font></h2>
							<br>
							Hello,<br><br>
							Your service running on  <b>${myAddr}</b> port <b>${app.port}</b> has just been started.
							<br><br>
							We hope that you are enjoying the framify experience.
							<br>
							<h4>Sincerely:</h4>
							<br>
							<i><u>The framify team.</u></i>
							<br><br><br>
							`,
					attachment: `${__dirname}/../favicon.ico`
				};

var genMail = (sendData) => {
	return new Promise( (resolve,reject) => {
		resolve({
			from : sendData.from
			,to: [sendData.to]
			,bcc: sendData.bcc
			,subject: sendData.subject 
			,text: sendData.text
			,html: sendData.html
			,attachment: sendData.attachment || `${__dirname}/../favicon.ico`
		})
	})
}

var getPassword = (to,link) => {
	return {
					from: `Info-Med Accounts <accounts@bixbyte.io>`
					,to: to.email
					,reply_to: 'noreply@bixbyte.io'
					,subject: `Password Reset Request.`
					,text: `Hello ${to.name},\n\n Your password reset key is ${link}\n\nWe hope that you are enjoying the Info-Med experience.\n\nIf you didn't request for a reset key , please ignore this.\n\nSincerely:\n\tThe Info-Med team. `
					,html: `<font color="gray"><u><h2>PASSWORD RESET</u></font></h2>
							<br>
							Hello ${to.name},<br><br>
							we at Info-Med have received a password  reset request for your account.
							<br><br>
							Your access code is

							<br><br>
							<bold><span style="background-color: #E6EDF3;padding:10px;">${link}</span></bold>

							<br><br>
							If you got this email erroneously, please ignore it.
							<br><br>
							We hope that you are enjoying the Info-Med experience.
							<br><br>
							Sincerely:<br>
							<i>The Info-Med team.</i>
							<br><br><br>
							`
					// ,attachment: `${__dirname}/../favicon.ico`
			};

};

// sendMail(mailData)
// .then(d=>c_log(d))
// .catch(e=>c_log(e));


//** SETUP THE PHP CGI
app.use("/php", php.cgi(`${__dirname}/../php`) );

//app.port    = app.port || 5000;

//!SET THE BASIC DIRECTORY MIDDLEWARE
app.use(express.static( __dirname + '/../'));

//!ROOT ROUTE
app.route("/").all(function(req,res){
	res.sendFile( "index.html");
});

app.route("/sendMail")
.all( (req,res) => {
	let mailParams = keyFormat(req.body);
	genMail(mailParams)
	.then( (d) => {
		sendMail(d)
		.then( (sd) => { 			
			res.send( makeResponse(200,sd) )
		})
		.catch( (ed) => { 
			console.log( "Failed to send email")
			console.dir(ed)
			res.send( makeResponse(500, (ed.message || ed ) ) )
		})
	})
	.catch( (em) => { 
		console.log( "Failed to initialize email parameters")
		res.send( makeResponse( 500,(em.message || em )) ) 
	})
})

app.route("/accounts/recovery")
.all( (req,res) => {

	req.body = keyFormat(req.body,["email","name","token"]);
	// http://192.168.1.136:1357/#/u_change_password/ianmin2@live.com/153797e5fc6433812172aa8d47ec69e1
	sendMail( getPassword({ email: req.body.email, name: req.body.name },`${req.body.token}`) )
	.then( d => res.send( makeResponse( 200, d ) ) )
	.catch( e => res.send( makeResponse( 500, e ) ) )

});

app.route("/login").all( (req,res) => {
	//console.log( JSON.stringify(fs.readFileSync(`${__dirname}/../login.html`,'utf8'),null,2) )
	res.send(fs.readFileSync(`${__dirname}/../login.html`,'utf8'));
})

//!ROUTE LEADING TO THE HOME DIRECTORY
app.route("/sample/:iara").all(function(req,res){
	var i = req.params.iara;
	res.sendFile( i ,{ "root": __dirname + "/../" });
});

//!ROUTE LEADING TO THE CONFIGURATION FILE DIRECTORY 
app.route("/config/:fname").all(function(req,res){
	c_log("getting the file" + req.params.fname)
	res.sendFile(req.params.fname, { "root": __dirname + "/../config/"} )
});


// app.route("/testMail")
// .all((req,res)=>{
// 	var from_email 	= new helper.Email("bixbyte@bixbyte.io");
// 	var to_email  	= new helper.Email("ianmin2@live.com");
// 	var subject 	= " TEST EMAIL RECOVERY EMAIL";
// 	var content     = new helper.Content("text/plain", "Something got to the recipient.");

// 	var mail = new helper.Mail(from_email, subject, to_email, content);

// 	var request = sg.emptyRequest({
// 									method: 'POST',
// 									path: '/v3/mail/send',
// 									body: mail.toJSON(),
// 								});
	
// 	sg.API(request, function(error, response) {
// 		console.log(response.statusCode);
// 		console.log(response.body);
// 		console.log(response.headers);
// 	});

// })

//!THE SERVER STARTUP FILE
server.listen(app.port ,function(err){
	if(!err){
		log(`Running server on `.success + `http://${myAddr}:${app.port}`.err);
	}
});	
