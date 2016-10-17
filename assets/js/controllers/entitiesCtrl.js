app.controller("entitiesController",["$scope","$ionicModal",($scope,$ionicModal) => {
    
    //@ CURRENT EDIT ITEM HANDLER
    $scope.current      = [];
    $scope.editing      = false;

    //@ HANDLE ENTITY EDITING
    $scope.editEntity   = (currdata) => {
        $scope.current  = currdata;
        $scope.editing  = true;
    };

    //@ CLEAR ENTITY EDITING
    $scope.clearEntity  = () => {
        $scope.current  = [];
        $scope.editing  = false;
    };    

}]);