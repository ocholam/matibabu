/**
 * MAILGUN EMAIL
 */
// var apiKey = require(`${__dirname}/../config/mailgun.conf`);


// console.log(apiKey);

fs = require('fs');

fs.readFile(`${__dirname}/../config/mailgun.conf`,(i,e) => {
    console.log( e.toString('utf8') )
})

console.log("Hi there!");