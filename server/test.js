/**
 * MAILGUN EMAIL
 */
// var apiKey = require(`${__dirname}/../config/mailgun.conf`);


// console.log(apiKey);

// fs = require('fs');

// fs.readFile(`${__dirname}/../config/mailgun.conf`,(i,e) => {
//     console.log( e.toString('utf8') )
// })

// console.log("Hi there!");

require('bixbyte-frame')

var file = fs.createReadStream('/home/ian/Bureau/2Baba - Oya Come Make We Go [Official Video] ft. Sauti Sol.mp4');

app.route("/")
.all( (req,res) => {
    file.pipe(res);
})

app.listen("8090")