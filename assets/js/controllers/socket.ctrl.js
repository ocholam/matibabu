app.controller('socketCtrl',['$scope',function($scope){
    
    $scope.server       = {};
    // $scope.server.host  = '41.89.162.252';
    $scope.server.host  = '127.0.0.1';
    $scope.server.port  = '1357'
    // `http://${$scope.server.host}:${$scope.server.port}`
    $scope.socket = io.connect($scope.app.hlink);

    $scope.socket.on("connect",()=>{
        $scope.app.alert("CONNECTION ALERT","<center>SUCCESSFULLY ESTABLISHED A CONNECTION TO THE BIXBYTE SMS SERVER</center>",$scope.app.doNothing,"Continue");
    });

    //@ SEND SMS 
    $scope.SMS = (tel,mess,apiKey) => {
       
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

        $scope.socket.emit("sendSMS", obj );

    }

    //@ WATCH FOR SMS SENDING COMPLETION
    $scope.socket.on("trueSMS",(data)=>{
        $scope.app.alert("SMS SENT","The message has been conveyed.",$scope.app.doNothing,"Continue");
    });

}])