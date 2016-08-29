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
var helper = require("sendgrid").mail;
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
//** SETUP THE PHP CGI
app.use("/php", php.cgi(`${__dirname}/../php`) );

//app.port    = app.port || 5000;

//!SET THE BASIC DIRECTORY MIDDLEWARE
app.use(express.static( __dirname + '/../'));

//!ROOT ROUTE
app.route("/").all(function(req,res){
	res.sendFile( "index.html");
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