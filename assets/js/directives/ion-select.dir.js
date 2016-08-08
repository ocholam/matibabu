app.directive('ionSelect',function(){
    'use strict';
    return{
        restrict: 'EAC',
        scope: {
           label:'@',
            labelField:'@',
            provider:'=',
            ngModel: '=?',
            ngValue: '=?',           
        },
         require: '?ngModel',
         transclude : false,
         replace: false,
        template:
                    '<div class="selectContainer">'
                        +'<label class="item item-input item-stacked-label">' 
                            +'<span class="input-label">{{label}}</span>'
                            +'<div class="item item-input-inset">'
                                +'<label class="item-input-wrapper">'
                                    +'<i class="icon ion-ios7-search placeholder-icon"></i>'
                                    +'<input id="filtro" type="search"  ng-model="ngModel" ng-value="ngValue" ng-keydown="onKeyDown()"/>'
                                +'</label>'
                                +'<button class="button button-small button-clear" ng-click="open()">'
                                    +'<i class="icon ion-chevron-down"></i>'
                                +'</button>'
                            +'</div>' 
                        +'</label>'
                        +'<div class="optionList padding-left padding-right" ng-show="showHide">'
        +'<ion-scroll>'
                            +'<ul class="list">'
        +'<li class="item" ng-click="selecionar(item)" ng-repeat="item in provider | filter:ngModel">{{item[labelField]}}</li>'                    
                            +'</ul>'
        +'</ion-scroll>'
                        +'</div>'    
                    +'</div>'
             ,
        link: function (scope, element, attrs,ngModel) {
            scope.ngValue = scope.ngValue !== undefined ? scope.ngValue :'item';
            
            scope.selecionar = function(item){
                ngModel.$setViewValue(item);
                scope.showHide = false;
            };
            
            element.bind('click',function(){
                element.find('input').focus();
            });
            
            scope.open = function(){
                
                  scope.ngModel = "";  
                return scope.showHide=!scope.showHide;
            };
            
            scope.onKeyDown = function(){
                scope.showHide = true;
                if(!scope.ngModel){
                     scope.showHide = false;
                }
            }
            
            scope.$watch('ngModel',function(newValue){
                if(newValue)
           element.find('input').val(newValue[scope.labelField]);
               
            });
        },
    };
});



var teste = angular.module('ionicTeste',['ionic','ionicSelect']);

teste.controller('testeController',function($scope){
   
    var data = [{id:1,nmPlaca:'IKC-1394'},{id:2,nmPlaca:'IKY-5437'},{id:3,nmPlaca:'IKC-1393'},{id:4,nmPlaca:'IKI-5437'},{id:5,nmPlaca:'IOC-8749'},{id:6,nmPlaca:'IMG-6509'}];
    $scope.veiculos = data;
    $scope.testa = function(){
      alert($scope.veiculo.nmPlaca);
    }
});