//The BASIC sms sending application service
app.service("sms",['app',function(app){
    
    /**
     * This angular service allows for you to easily send SMS messages conveniently using bixbyte's default SMS server
     * 
     * It allows the use of your *Framify SMS* android phone application to send simple SMS messages. 
     * 
     * You can easily extend it as you will since the socket connection to the server can be hooked to as "sms.socket"
     */

    //@ BASIC APPLICATION INITIALIZATION
    this.server       = {};
    this.server.host  = '41.89.162.252';
   //this.server.host  = '127.0.0.1';
    this.server.port  = '3000';
    this.socket       = io.connect(`http://${this.server.host}:${this.server.port}`);
    const socket      = this.socket;


    //@ SEND EXPRESS SMS'
    this.SMS = (smsData) => {
        socket.emit("sendSMS",smsData);
    };

    //@ SEND A SINGLE SMS
    this.oneSMS = (tel,mess,apiKey) => {
       
        var obj;
        if(Array.isArray(tel)){
            obj = tel;
        }else{
            obj = { 
                        telephone : tel,
                        message: mess,
                        password: apiKey
                    };
        }

        socket.emit("sendSMS", obj );

    };

    //@ SEND BULK SMS MESSAGES
    this.bulkSMS = (contacts,data,apiKey) => {
        const obj = [];
        if(!apiKey){
            app.alert('SMS ERROR','<center>Failed to instantiate the SMS sending service before api Key definition.</center>',app.doNothing,'I\'ll fix it!');
        }else if(Array.isArray(contacts)){
            
            contacts.forEach(function(element) {
                if(app.isTelephone(element) ){
                    obj.push({
                        telephone: element,
                        message: data,
                        apiKey: apiKey
                    });
                }else{
                    app.alert('SMS ERROR','<center>Could not send an SMS message to the invalid number '+ element +'.</center>',app.doNothing,'I\'ll fix it!');
                }
                
            }, this);

             socket.emit("sendSMS",obj);

        }else{
            app.alert('SMS ERROR','<center>You can only use the bulk SMS service with an array of telephone contacts</center>',app.doNothing,'I\'ll fix it!');
        }        
    };

    // @ SAMPLE APPLICATION SOCKET CONNECTION HANDLER
    // this.socket.on("connect",()=>{
    //     app.alert("CONNECTION ALERT","<center>SUCCESSFULLY ESTABLISHED A CONNECTION TO THE BIXBYTE SMS SERVER</center>",app.doNothing,'I\'ll get excited!');
    // });

    
    //@ SAMPLE SUCCESSFUL SMS SENDING INFORMATION HANDLER
    this.socket.on("trueSMS",(data)=>{
        app.alert("SMS SENT","The message has been conveyed.",app.doNothing,"Continue");
    });

}])