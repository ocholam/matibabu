app.controller("appController", ['app','$scope','$location','$ionicModal','$rootScope','$ionicSideMenuDelegate','$ionicSlideBoxDelegate',"$stateParams",function( app, $scope, $location, $ionicModal, $rootScope, $ionicSideMenuDelegate, $ionicSlideBoxDelegate, $stateParams ){
    
    //!APPLICATION GLOBAL SCOPE COMPONENTS
    $scope.current  = {};
    $scope.ui       = {};
    
    $scope.urlParams = $stateParams;

    $rootScope.nav = [];
    //$rootScope.nav.search; 
    $rootScope.links = [];
    
    $scope.nav.hasFilters = false;

    //  && ( link.parent == 'false' || ( auth.mainAdmin != null  && auth.mainAdmin != undefined ) )
    
    //** MANAGE THE SIDENAV TOGGLE EVENTS
    //!Right sidenav
    $scope.nav.right = {};
    $scope.nav.right.toggle = function(){
        $ionicSideMenuDelegate.toggleRight();
    }
    
    //!Left sidenav
    $scope.nav.left = {};
    $scope.nav.left.toggle = function(){
        $ionicSideMenuDelegate.toggleLeft();
    }
    
    //** MANAGE THE NAVIGATION SEARCH STATUS
    $scope.openFilters = function(hasFilters){
        if(hasFilters === true) { $scope.nav.hasFilters = false; }else{ $scope.nav.hasFilters = true; }
    };
    
    //!INITIALIZE THE APPLICATION ROUTES
    var setRoutes = function(data){
        $scope.links = data;
        //console.dir( $scope.nav )
    };
    
    //!INITIALIZE THE APPLICATION DATA
    var setData = function(data){
        $scope.nav = data;
        //console.dir( $scope.links )
    };
    
    //!FETCH THE NECESSARY APPLICATION DATA
    $scope.app.getData(setData);
    $scope.app.getRoutes(setRoutes);  
    
    
    //!RE-INITIALIZE APPLICATION DATA
    $rootScope.app.reinit = function(){
      $scope.location.path("/framify");  
    };
    
    //!MOVE TO THE NEXT SLIDE
    $rootScope.app.navSlide =  function(index){
			$ionicSlideBoxDelegate.slide(index,500);
	};
        
    //!ESTABLISH APPLICATION UI COMPONENTS AND THEIR HANDLERS
        
    //*CALL A CUSTOM MODAL
    $scope.ui.modal = function( modal_template, modal_animation, modal_onHide, modal_onRemove ){
     
        modal_template = modal_template || "views/login.html";
        
        //~ Setup the custom modal
        $ionicModal.fromTemplateUrl( modal_template , {
            
            scope: $scope,
            animation: modal_animation || 'slide-in-up'
            
        })
        .then(function(modal) {
            
            $scope.current.modal = modal;
            
        });
        
        //~ Handle display of the modal
        $scope.current.openModal = function() {
            
            $scope.current.modal.show();
            
        };
        
       //~ Handle closure of the modal
       $scope.current.closeModal = function() {
           
            $scope.current.modal.hide();
           
       };
      
       //~ Destroy the modal after use
       $scope.$on('$destroy', function() {
           
            $scope.current.modal.remove();
           
       });
          
       //~ Perform an action on modal hide
       $scope.$on('current.modal.hidden', modal_onHide);
        
       //~ Perform an action on modal removal
       $scope.$on('current.modal.removed',modal_onRemove);
        
    };
    //*EO - CALL CUSTOM MODAL 
    
    //@ FUNCTION EXECUTOR
    $rootScope.exec = f=>f();    
    
    /**
     * SECURE THE PARENTAL CONTROLLED URLS
     */
    $rootScope.secure = ( securityFunc )=>{
        
        var parts = window.location.href.split('/');
        var part = parts[(parts.length-1)];
        if( $scope.links.indexOf(part) >= 0  ){
            
          $rootScope.exec( securityFunc ); 
            
        }
        
        
    }
 
    /**
     * DATABASE CENTRIC ADDITION AND DELETION
     */
    
    
    //Define the main application objects
    $scope.add      = {};
    $scope.fetch    = {};
    $scope.fetched  = {};
    $scope.counted  = {};
    $scope.data     = {};
     
    $scope.data.login   = {};
    $scope.data.admin   = {};
       
    $rootScope.frame.changeAdmin(false);
    $scope.logedin  = false;    
    
     //! BASIC ADDITION
     $scope.add = (table,data,UID,cryptFields,cb)=>{
                    data = (data)?$scope.app.json(data):{};                    
                    data.command   = "add";
                    data.table     = (table != undefined)?table.toString().replace(/vw_/ig,''):"";
                    data.token     =  data.token || $scope.storage.admin._;
                    data.extras    =  (data)? ( (data.extras)?data.extras.replace(/LIMIT 1/ig,''): undefined ):undefined;
                    if(cryptFields){ 
                       cryptFields.split(",").forEach((cryptField)=>{
                           data[cryptField] = $scope.app.md5(data[cryptField]) 
                       });                        
                    }
                    $scope.cgi.ajax( data )
                    .then( (r) => {           
                       r = $scope.app.json(r);
                       if(r.response == 200){
                           $scope.app.UID(UID,`<center> ${r.data.message}</center>`, "success");                          
                           $scope.fetch(table,{specifics: data.specifics}); 
                           $scope.data[table.toString().replace(/vw_/ig,'')] = {};
                           if(typeof(cb)==="function"){
                               cb(data,r);
                           }else{
                               console.log('\n\n An invalid callback function was passed.')
                               console.dir( typeof(cb) );
                               console.log('\n\n')
                           }
                       }else{
                            //POSTGRESQL MATCHING
                            if(Array.isArray(r.data.message)){
                                var v =  r.data.message[2].match(/DETAIL:(.*)/)
                                if( v != undefined || v!=null ){
                                    r.data.message = v[1];
                                }else{
                                    r.data.message = r.data.message[2];
                                }
                            }else{
                                r.data.message;
                            }
                        
                            $scope.app.alert("ERROR",`<center>${ r.data.message }</center>`,$scope.app.doNothing,"CONTINUE");
                       }           
                        $scope.$apply();
                    })        
                };
    
     //! BASIC UPDATING
     $scope.update = (table,data,UID,cryptFields,cb,cbData)=>{
                    data = (data)?$scope.app.json(data):{};                    
                    data.command   = "update";
                    data.table     = (table != undefined)?table.toString().replace(/vw_/ig,''):"";
                    data.token     =  data.token || $scope.storage.admin._;
                    data.extras    =  (data)? ( (data.extras)?data.extras.replace(/LIMIT 1/ig,''): undefined ):undefined;
                    if(cryptFields){ 
                       cryptFields.split(",").forEach((cryptField)=>{
                           data[cryptField] = $scope.app.md5(data[cryptField]) 
                       });                        
                    }
                    $scope.cgi.ajax( data )
                    .then( (r) => {           
                       r = $scope.app.json(r);
                       if(r.response == 200){
                           $scope.app.UID(UID,`<center> ${r.data.message}</center>`, "success");                          
                           $scope.fetch(table,{specifics: data.specifics}); 
                           $scope.data[table.toString().replace(/vw_/ig,'')] = {};
                           if( typeof(cb) == 'function' ){
                              cb( (cbData || data.data.message) );                               
                           }

                       }else{
                           //POSTGRESQL MATCHING
                            if(Array.isArray(r.data.message)){
                                var v =  r.data.message[2].match(/DETAIL:(.*)/)
                                if( v != undefined || v!=null ){
                                    r.data.message = v[1];
                                }else{
                                    r.data.message = r.data.message[2];
                                }
                            }else{
                                r.data.message;
                            }
                        
                            $scope.app.alert("ERROR",`<center>${ r.data.message }</center>`,$scope.app.doNothing,"CONTINUE");
                       }           
                        $scope.$apply();
                    })        
                };
    
    
    //! BASIC DATA FETCHING
    var do_fetch = ( table,data,UID )=>{
            
            data = (data)?$scope.app.json(data):{};
            data.command    = "get";
            data.table      = table;        
            $scope.cgi.ajax(data)
            .then(function(r){
                    r = $scope.app.json(r);
                    if(r.response == 200){
                            $scope.fetched[table] = r.data.message;
                    }else{
                        //POSTGRESQL MATCHING
                            if(Array.isArray(r.data.message)){
                                    var v =  r.data.message[2].match(/DETAIL:(.*)/)
                                    if( v != undefined || v!=null ){
                                            r.data.message = v[1];
                                    }else{
                                            r.data.message = r.data.message[2];
                                    }
                            }else{
                                    r.data.message;
                            }
                        
                            $scope.app.alert("ERROR",`<center>${ r.data.message }</center>`,$scope.app.doNothing,"CONTINUE");
                    }
                    $scope.$apply();
            }) 
        
    };
    
    $scope.fetch = (table,data,UID)=>{
        
        if( Array.isArray(table) ){			
            table.forEach( (tData,tkey)=>do_fetch(tData[0],tData[1],tData[2]) );
        }else{
            do_fetch(table,data,UID);
        }
        
    };
      
      
    //! BASIC DELETION  
    $scope.del = (table,data,UID,delID)=>{
        data = (data)?$scope.app.json(data):{};
        data.command    = "del";
        data.table      = (table != undefined)?table.toString().replace(/vw_/ig,''):"";
        data.token      = data.token || $scope.storage.admin._;
        $scope.cgi.ajax(data)
        .then(function(r){
            r = $scope.app.json(r);
            if(r.response == 200){                           
                $scope.fetched[table].splice(delID,1);  
                $scope.app.UID('response',`<center>${r.data.message}</center>`,"info");                           
            }else{
              
                //POSTGRESQL MATCHING
                if(Array.isArray(r.data.message)){
                    var v =  r.data.message[2].match(/DETAIL:(.*)/)
                    if( v != undefined || v!=null ){
                         r.data.message = v[1];
                    }else{
                         r.data.message = r.data.message[2];
                    }
                }else{
                    r.data.message;
                }
               
                $scope.app.alert("ERROR",`<center>${ r.data.message }</center>`,$scope.app.doNothing,"CONTINUE");
            }
            $scope.$apply();
                
        })
    };

    //Basic User Login
    $scope.login = (cryptField) => {
         if(cryptField){ 
            $scope.data.login[cryptField] = $scope.app.md5($scope.data.login[cryptField])  
        }
        $scope.data.login.command   = "get";
        $scope.data.login.table     = "users";
        $scope.data.login.extras    = " AND active is true LIMIT 1";
        $scope.cgi.ajax( $scope.data.login )
        .then((r)=>{
                $scope.data.admin.extras = "";
                r = $scope.app.json(r);
                if(r.response == 200){
                                        
                    if(r.data.message.length > 0 && typeof(r.data.message[0]) == "object" ){
                        if(  r.data.message[0]['username'] == $scope.data.login.username  ){
                            $scope.storage.user = r.data.message[0];
                            $scope.logedin      = true;
                        }else{
                           delete $scope.storage.user;
                           window.location = "/#/";
                        }
                        
                    }else{
                        delete $scope.storage.user;
                        $scope.app.UID('response',`<center>You have entered the wrong login credentials.</center>`,"danger");
                    }
                    
                }else{
                    //POSTGRESQL MATCHING
                    if(Array.isArray(r.data.message)){
                        var v =  r.data.message[2].match(/DETAIL:(.*)/)
                        if( v != undefined || v!=null ){
                            r.data.message = v[1];
                        }else{
                            r.data.message = r.data.message[2];
                        }
                    }else{
                        r.data.message;
                    }
                
                    $scope.app.alert("ERROR",`<center>${ r.data.message }</center>`,$scope.app.doNothing,"CONTINUE");
                    delete $scope.storage.user;
                }
                $scope.$apply();
                
            })
    };

    //Basic admin login
    $scope.adminLogin = (cryptField) => {
        if(cryptField){ 
            $scope.data.admin[cryptField] = $scope.app.md5($scope.data.admin[cryptField])  
        }
        $scope.data.admin.command   = "get"
        $scope.data.admin.table     = "admins"
        $scope.data.admin.extras    = " AND active is true LIMIT 1"
        $scope.cgi.ajax($scope.data.admin)
        .then((r)=>{
            $scope.data.admin.extras = "";
            r = $scope.app.json(r);
            if(r.response == 200){
                
                // console.log(`Data length: ${r.data.message.length} \n Message Type: ${typeof(r.data.message[0])} \n Message: `)
                // console.dir(  r.data.message[0] )
                
                if(r.data.message.length > 0 && typeof(r.data.message[0]) != undefined ){
                    
                    if(  r.data.message[0]['password'] === $scope.data.admin.password  ){
                        $scope.storage.admin        = r.data.message[0];
                        $scope.storage.admin._      = {};
                        $scope.storage.admin._.user = r.data.message[0].admin_name;
                        $scope.storage.admin._.key  = r.data.message[0].password;
                        $rootScope.frame.changeAdmin(true);                        
                    }else{
                        delete $scope.data.admin;
                        delete $scope.storage.admin;
                        window.location = "/#/admin"; 
                    }
                    
                }else{
                    delete $scope.data.admin;
                    delete $scope.storage.admin;
                    $scope.app.UID('response',`<center>You have entered the wrong login credentials.</center>`,"danger");
                    window.location = "/#/admin";                       
                    
                }
                
            }else{
               //POSTGRESQL MATCHING
                if(Array.isArray(r.data.message)){
                    var v =  r.data.message[2].match(/DETAIL:(.*)/)
                    if( v != undefined || v!=null ){
                         r.data.message = v[1];
                    }else{
                         r.data.message = r.data.message[2];
                    }
                }else{
                    r.data.message;
                }
               
                $scope.app.alert("ERROR",`<center>${ r.data.message }</center>`,$scope.app.doNothing,"CONTINUE");
                delete $scope.storage.admin;
            }
            $scope.$apply();
        })
    };

    //@ Handle basic user re-authentication
    $scope.islogedin = () => {
        if($scope.storage.user){
            $scope.data.login.username = $scope.storage.user.username;
            $scope.data.login.password = $scope.storage.user.password;
            $scope.login();
        }
    };
    
    //@ Handle basic app-user logout
    $scope.logout = () => {
        $scope.islogedin = false;
        delete $scope.storage.user;
        window.location = '/#/';
    };

    //@ Handle basic application redirection
    $scope.redirect = (loc) => {
        if(loc){
             window.location = loc
        }else{
            window.location = "/#/framify";
        }ect       
    };

    // Basic Admin Auth
    $scope.authorize = () => {
        if($scope.storage.admin){
           $scope.data.admin        = {}; 
           $scope.data.admin.admin_name    = $scope.storage.admin.admin_name;
           $scope.data.admin.password      = $scope.storage.admin.password;
           $scope.adminLogin();
        }else{
            $scope.location = "/#/admin";
        }
    };
    
    $scope.deauthorize = () => {
        delete $scope.storage.admin; 
        $rootScope.frame.changeAdmin(false);               
        window.location = '/#/';
    };
    
    
    // BASIC Custom Queries
    $scope.custom = (table,data,UID,mess)=>{
        data = (data)?$scope.app.json(data):{};                    
        data.command   = "custom";
        data.token     =  data.token || $scope.storage.admin._;
        // console.dir( data );
        $scope.cgi.ajax( data )
        .then( (r) => {           
            r = $scope.app.json(r);
            if(r.response == 200){
                $scope.app.UID(UID,(mess||`<center>${r.data.message}</center>`), "success"); 
                $scope.cFetched[table] = r.data.message;
                $scope.data[table.toString().replace(/vw_/ig,'')] = {};
            }else{
                //POSTGRESQL MATCHING
                if(Array.isArray(r.data.message)){
                    var v =  r.data.message[2].match(/DETAIL:(.*)/)
                    if( v != undefined || v!=null ){
                        r.data.message = v[1];
                    }else{
                        r.data.message = r.data.message[2];
                    }
                }else{
                    r.data.message;
                }
            
                $scope.app.alert("ERROR",`<center>${ r.data.message }</center>`,$scope.app.doNothing,"CONTINUE");
            }           
            $scope.$apply();
        })        
    };

    //BASIC Instance Counter
    $scope.count = (table,data,UID,mess) => {
        
        data            = (data)?$scope.app.json(data):{};
        data.table      = table;
        data.command    = "count";
        data.token      = data.token || {};

         $scope.cgi.ajax( data )
        .then( (r) => {   

            r = $scope.app.json(r);

            if(r.response == 200){

                if( mess ) {
                    $scope.app.UID(UID,(mess), "success");
                }
                 
                $scope.counted[table.toString().replace(/vw_/ig,'')] = r.data.message;
                $scope.data[table.toString().replace(/vw_/ig,'')] = {};
                
            }else{

                //POSTGRESQL MATCHING
                if(Array.isArray(r.data.message)){
                    var v =  r.data.message[2].match(/DETAIL:(.*)/)
                    if( v != undefined || v!=null ){
                        r.data.message = v[1];
                    }else{
                        r.data.message = r.data.message[2];
                    }
                }else{
                    r.data.message;
                }
            
                $scope.app.alert("ERROR",`<center>${ r.data.message }</center>`,$scope.app.doNothing,"CONTINUE");
            }           
            $scope.$apply();
        })    

    };

   /**
    * TABLE SORTER
    */
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
 

    /**
     *  DELETE UNWANTED FIELDS
     */
    $scope.sanitize = (data,keys) => {
        if(keys){
            keys.split(",").forEach((key)=>{
                delete data[key];
            }); 
        }
    };

   /**
    * PUSH DATA TO OBJECT
   */
    $scope.dPush = (obj,key,val) =>{
       obj[key] = val;
    };

   /**
   * @ MONTH REGULATION
   */
   $scope.currmoin =  $scope.app.monthNum();
   $scope.setMoin  = (moin)=>{$scope.currmoin=moin;} 

//@ INJECT A STANDARD WHERE "Extras" OBJECT
$scope.addExtras = ( targetObj, extrasObj, subStrings, removeKeys) => {

        targetObj  = (targetObj)? $scope.app.clone(targetObj) : {};
        extrasObj  = (extrasObj)? $scope.app.clone(extrasObj) : {};
        subStrings = subStrings || '';
        removeKeys = removeKeys || '';

        var extras = '';

        var k = [],v = [];

        //@ CAPTURE THE REMOVE KEYS
        removeKeys = removeKeys.split(',').filter(e=>e);


        removeKeys.forEach( e => {
            extrasObj[e] = null;
            delete extrasObj[e];
        });

        //@ CAPTURE REPLACE STRINGS
        subStrings
            .split(',')
        .forEach( (e,i) => {
            let x = e.split(':');
            k[i] = (x[0]);
            v[i] = (x[1]);				
        })

        //@ GET THE DEFINED KEYS
        var keys = Object.keys(extrasObj);

        //@ REPLACE THE DEFINED WITH THE DESIRED REPLACE KEYS
        k.forEach( (e,i) => {

            if( keys.indexOf(e) != -1 ){
                
                extrasObj[ v[i] ]  = extrasObj[e];
                extrasObj[e] = null;
                delete extrasObj[e];

            }
            
        });

        
        k = Object.keys(extrasObj);
        v = null;

        k.forEach( (e,i) => {
            
            extras += ' ' + e + "='"+extrasObj[e]+"' AND";

        });

        k = null;

        
        targetObj.extras =  extras.replace(/AND+$/,'');

        return targetObj;

};

///////////////////////////////////////////////////////////////////////////////////////////////////
// APPLICATION SPECIFIC ADDITIONS

 //@ Count my entities
    $scope.howMany = () => {

        var data        = {owner: storage.user.username};
        data            = (data)?$scope.app.json(data):{};
        data.table      = 'entities';
        data.command    = "count";
        data.token      =  {};

         $scope.cgi.ajax( data )
        .then( (r) => {   
            
            r = $scope.app.json(r);

            if(r.response == 200){

                if( mess ) {
                    $scope.app.UID(UID,(mess), "success");
                }
                 
                $scope.counted[data.table.toString().replace(/vw_/ig,'')] = r.data.message;
                
            }else{

                //POSTGRESQL MATCHING
                if(Array.isArray(r.data.message)){
                    var v =  r.data.message[2].match(/DETAIL:(.*)/)
                    if( v != undefined || v!=null ){
                        r.data.message = v[1];
                    }else{
                        r.data.message = r.data.message[2];
                    }
                }else{
                    r.data.message;
                }
            
                $scope.app.alert("ERROR",`<center>${ r.data.message }</center>`,$scope.app.doNothing,"CONTINUE");
            }           
            $scope.$apply();
        })    


    };


}])
