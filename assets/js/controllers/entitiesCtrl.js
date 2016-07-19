app.controller("entitiesController",["$scope","$ionicModal",($scope,$ionicModal) => {
    
    /**
    *@ MODAL DISPLAY
    */

    $scope.editEntity = () => {

        $ionicModal.fromTemplateUrl('entity_edit.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            console.log("Modal loaded!");
            
            if( !$scope.storage.setup ){

                $scope.modal.show();

            }else{

                //! Do Something else here 

            }
        });

    };
    

}])