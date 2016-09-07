app.controller('hospitalCtrl',['$scope',function($scope){

    //@ REDIRECT USER TO LOGIN PAGE
    $scope.loginRedirect = () => {
        window.location = "/#/login";
    };

    //@ SETUP USER CREDENTIALS FOR USER SIGNUP
    $scope.setCreds = (obj) => {
        obj         = obj || {};
        obj.token   = {
                            user: "userAdmin",
                            key:  "153797e5fc6433812172aa8d47ec69e1",
                            specifics: 'Direct user request (signup,appointments)'
                        };
        return obj;
    };

    $scope.newAppontment = (data) => {
       
    }

   

    //@ LIST A REPORT FOR THE NEXT APPOINTMENT
    $scope.nextAppointment = (entity) => {
        const sms = [
                        //! THE PRACTITIONER's MESSAGE
                        { 
                            telephone:  $scope.appointmentTelephone,
                            message:    `Hello ${$scope.appointmentTitle}, you have a new appointment request to review on the matibabu portal.`,
                            password:   "355912060268866" 
                        },
                        //! THE CLIENT'S MESSAGE
                        { 
                            telephone:  entity.telephone,
                            message:    `Thank you ${entity.name}, your request for an appointment has been received. ${$scope.appointmentTitle} will get back to you as soon as possible.`,
                            password:   "355912060268866" 
                        }
                    ];


        sms.forEach(mess=>{
            $scope.sms.oneSMS(mess.telephone,mess.message,mess.password); 
        });
        
        $scope.bookAppointment     =false;
    };

    //@ ALLOW FOR APPOINTMENT SETTING
    $scope.setAppointment = (entity) => {
        $scope.bookAppointment     =true;
        $scope.appointmentId       =entity.entity_id;
        $scope.appointmentTitle    =entity.title;
        $scope.appointmentTelephone=entity.telephone;
       //$scope.$apply();
    };

    //@ ALLOW FOR APPOINTMENT UNSETTING
    $scope.clearAppointment = () => {
        $scope.bookAppointment     =false;
        //$scope.$apply();
    }



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

    };

    // //@ SIMPLE FILTER BY OWNER
    // $scope.isMine = (genInfo) =>{
    //     console.log(genInfo.owner==$scope.storage.user.username)
    //     return (genInfo.owner==$scope.storage.user.username);
    //  } 

}])