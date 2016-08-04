app.controller('hospitalCtrl',['$scope',function($scope){

    //@ REDIRECT USER TO LOGIN PAGE
    $scope.loginRedirect = () => {

        window.location = "/#/login";

    };

    //@ SET DEFAULT APPLICATION ACCESS CREDENTIALS 
    $scope.sudo = (obj,usercreds) => {

        if(usercreds&&obj){
           obj.token = {};
           obj.token = {
                user: "userAdmin",
                key:  "153797e5fc6433812172aa8d47ec69e1",
                specifics: usercreds
            };
            return obj;
            
        }else{
            $scope.app.alert("Error","<center>User credentials are required in order to invoke the sudo function</center>");
            return {};
        }

    }

}])