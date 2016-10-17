app.controller('socketCtrl',['$scope',function($scope){
    
    $scope.server       = {};
    // $scope.server.host  = '41.89.162.252';
    $scope.server.host = url[0].split(':')[0];
    $scope.server.port = url[0].split(':')[1];
    $scope.server.hlink = "http://"+$scope.server.host+":"+$scope.server.port;
    // `http://${$scope.server.host}:${$scope.server.port}`
    $scope.socket = io.connect($scope.server.hlink);

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