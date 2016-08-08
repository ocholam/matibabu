"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};!function e(a,t,n){function o(i,r){if(!t[i]){if(!a[i]){var p="function"==typeof require&&require;if(!r&&p)return p(i,!0);if(s)return s(i,!0);throw new Error("Cannot find module '"+i+"'")}var l=t[i]={exports:{}};a[i][0].call(l.exports,function(e){var t=a[i][1][e];return o(t?t:e)},l,l.exports,e,a,t,n)}return t[i].exports}for(var s="function"==typeof require&&require,i=0;i<n.length;i++)o(n[i]);return o}({1:[function(e,a,t){app.controller("framifySampleController",["$scope","$http",function(e,a){e.voters=[];var t=function(a){console.log("SETTING VOTERS"),e.voters=a};e.customify=function(a){e.app.alert(e.nav.alias||e.nav.title,"<center>DONE!</center>",e.app.doNothing)},e.sav=function(){e.app.confirm(e.nav.alias||e.nav.title,"Do you really want to save this widget",e.customify)},e.del=function(){e.app.confirm(e.nav.alias||e.nav.title,"Are you sure you want to DELETE this widget",e.customify)},e.app.getJSON("./sample/sample.json",t),e.testify=function(){return"Correct!!"},e.labels=["January","February","March","April","May","June","July"],e.series=["Series A","Series B"],e.data=[[65,59,80,81,56,55,40],[28,48,40,19,86,27,90]],e.onClick=function(e,a){console.log(e,a)},e.datasetOverride=[{yAxisID:"y-axis-1"},{yAxisID:"y-axis-2"}],e.options={scales:{yAxes:[{id:"y-axis-1",type:"linear",display:!0,position:"left"},{id:"y-axis-2",type:"linear",display:!0,position:"right"}]}}}])},{}],2:[function(e,a,t){app.controller("appController",["app","$scope","$location","$ionicModal","$rootScope","$ionicSideMenuDelegate","$ionicSlideBoxDelegate",function(e,a,t,n,o,s,i){a.current={},a.ui={},o.nav=[],o.links=[],a.nav.hasFilters=!1,a.nav.right={},a.nav.right.toggle=function(){s.toggleRight()},a.nav.left={},a.nav.left.toggle=function(){s.toggleLeft()},a.openFilters=function(e){e===!0?a.nav.hasFilters=!1:a.nav.hasFilters=!0};var r=function(e){a.links=e},p=function(e){a.nav=e};a.app.getData(p),a.app.getRoutes(r),o.app.reinit=function(){a.location.path("/framify")},o.app.navSlide=function(e){i.slide(e,500)},a.ui.modal=function(e,t,o,s){e=e||"views/login.html",n.fromTemplateUrl(e,{scope:a,animation:t||"slide-in-up"}).then(function(e){a.current.modal=e}),a.current.openModal=function(){a.current.modal.show()},a.current.closeModal=function(){a.current.modal.hide()},a.$on("$destroy",function(){a.current.modal.remove()}),a.$on("current.modal.hidden",o),a.$on("current.modal.removed",s)},o.exec=function(e){return e()},o.secure=function(e){var t=window.location.href.split("/"),n=t[t.length-1];a.links.indexOf(n)>=0&&o.exec(e)},a.add={},a.fetch={},a.fetched={},a.data={},a.data.login={},a.data.admin={},o.frame.changeAdmin(!1),a.logedin=!1,a.add=function(e,t,n,o,s){t=t?a.app.json(t):{},t.command="add",t.table=void 0!=e?e.toString().replace(/vw_/gi,""):"",t.token=t.token||a.storage.admin._,t.extras=t&&t.extras?t.extras.replace(/LIMIT 1/gi,""):void 0,o&&o.split(",").forEach(function(e){t[e]=a.app.md5(t[e])}),a.cgi.ajax(t).then(function(o){if(o=a.app.json(o),200==o.response)a.app.UID(n,'<center> "Successfully Added."</center>',"success"),a.fetch(e,{specifics:t.specifics}),a.data[t.toString().replace(/vw_/gi,"")]={},"function"==typeof s?s(t,o):(console.log("\n\n An invalid callback function was passed."),console.dir("undefined"==typeof s?"undefined":_typeof(s)),console.log("\n\n"));else{if(Array.isArray(o.data.message)){var i=o.data.message[2].match(/DETAIL:(.*)/);void 0!=i||null!=i?o.data.message=i[1]:o.data.message=o.data.message[2]}else o.data.message;a.app.alert("ERROR","<center>"+o.data.message+"</center>",a.app.doNothing,"CONTINUE")}a.$apply()})},a.update=function(e,t,n,o){t=t?a.app.json(t):{},t.command="update",t.table=void 0!=e?e.toString().replace(/vw_/gi,""):"",t.token=t.token||a.storage.admin._,t.extras=t&&t.extras?t.extras.replace(/LIMIT 1/gi,""):void 0,o&&o.split(",").forEach(function(e){t[e]=a.app.md5(t[e])}),a.cgi.ajax(t).then(function(o){if(o=a.app.json(o),200==o.response)a.app.UID(n,'<center> "Successfully Updated."</center>',"success"),a.fetch(e,{specifics:t.specifics}),a.data[t.toString().replace(/vw_/gi,"")]={};else{if(Array.isArray(o.data.message)){var s=o.data.message[2].match(/DETAIL:(.*)/);void 0!=s||null!=s?o.data.message=s[1]:o.data.message=o.data.message[2]}else o.data.message;a.app.alert("ERROR","<center>"+o.data.message+"</center>",a.app.doNothing,"CONTINUE")}a.$apply()})};var l=function(e,t,n){t=t?a.app.json(t):{},t.command="get",t.table=e,a.cgi.ajax(t).then(function(t){if(t=a.app.json(t),200==t.response)a.fetched[e]=t.data.message;else{if(Array.isArray(t.data.message)){var n=t.data.message[2].match(/DETAIL:(.*)/);void 0!=n||null!=n?t.data.message=n[1]:t.data.message=t.data.message[2]}else t.data.message;a.app.alert("ERROR","<center>"+t.data.message+"</center>",a.app.doNothing,"CONTINUE")}a.$apply()})};a.fetch=function(e,a,t){Array.isArray(e)?e.forEach(function(e,a){return l(e[0],e[1],e[2])}):l(e,a,t)},a.del=function(e,t,n,o){t=t?a.app.json(t):{},t.command="del",t.table=void 0!=e?e.toString().replace(/vw_/gi,""):"",t.token=t.token||a.storage.admin._,a.cgi.ajax(t).then(function(t){if(t=a.app.json(t),200==t.response)a.fetched[e].splice(o,1),a.app.UID("response","<center>Deleted.</center>","info");else{if(Array.isArray(t.data.message)){var n=t.data.message[2].match(/DETAIL:(.*)/);void 0!=n||null!=n?t.data.message=n[1]:t.data.message=t.data.message[2]}else t.data.message;a.app.alert("ERROR","<center>"+t.data.message+"</center>",a.app.doNothing,"CONTINUE")}a.$apply()})},a.login=function(e){e&&(a.data.login[e]=a.app.md5(a.data.login[e])),a.data.login.command="get",a.data.login.table="users",a.data.login.extras=" AND active is true LIMIT 1",a.cgi.ajax(a.data.login).then(function(e){if(a.data.admin.extras="",e=a.app.json(e),200==e.response)e.data.message.length>0&&"object"==_typeof(e.data.message[0])?e.data.message[0].username==a.data.login.username?(a.storage.user=e.data.message[0],a.logedin=!0):(delete a.storage.user,window.location="/#/"):(delete a.storage.user,a.app.UID("response","<center>You have entered the wrong login credentials.</center>","danger"));else{if(Array.isArray(e.data.message)){var t=e.data.message[2].match(/DETAIL:(.*)/);void 0!=t||null!=t?e.data.message=t[1]:e.data.message=e.data.message[2]}else e.data.message;a.app.alert("ERROR","<center>"+e.data.message+"</center>",a.app.doNothing,"CONTINUE"),delete a.storage.user}a.$apply()})},a.adminLogin=function(e){e&&(a.data.admin[e]=a.app.md5(a.data.admin[e])),a.data.admin.command="get",a.data.admin.table="admins",a.data.admin.extras=" AND active is true LIMIT 1",a.cgi.ajax(a.data.admin).then(function(e){if(a.data.admin.extras="",e=a.app.json(e),200==e.response)e.data.message.length>0&&void 0!=_typeof(e.data.message[0])?e.data.message[0].password===a.data.admin.password?(a.storage.admin=e.data.message[0],a.storage.admin._={},a.storage.admin._.user=e.data.message[0].admin_name,a.storage.admin._.key=e.data.message[0].password,o.frame.changeAdmin(!0)):(delete a.data.admin,delete a.storage.admin,window.location="/#/admin"):(delete a.data.admin,delete a.storage.admin,a.app.UID("response","<center>You have entered the wrong login credentials.</center>","danger"),window.location="/#/admin");else{if(Array.isArray(e.data.message)){var t=e.data.message[2].match(/DETAIL:(.*)/);void 0!=t||null!=t?e.data.message=t[1]:e.data.message=e.data.message[2]}else e.data.message;a.app.alert("ERROR","<center>"+e.data.message+"</center>",a.app.doNothing,"CONTINUE"),delete a.storage.admin}a.$apply()})},a.islogedin=function(){a.storage.user&&(a.data.login.username=a.storage.user.username,a.data.login.password=a.storage.user.password,a.login())},a.logout=function(){a.islogedin=!1,delete a.storage.user,window.location="/#/"},a.redirect=function(e){e?window.location=e:window.location="/#/framify",ect},a.authorize=function(){a.storage.admin?(a.data.admin={},a.data.admin.admin_name=a.storage.admin.admin_name,a.data.admin.password=a.storage.admin.password,a.adminLogin()):a.location="/#/admin"},a.deauthorize=function(){delete a.storage.admin,o.frame.changeAdmin(!1),window.location="/#/"},a.custom=function(e,t,n,o){t=t?a.app.json(t):{},t.command="custom",t.token=t.token||a.storage.admin._,console.dir(t),a.cgi.ajax(t).then(function(s){if(s=a.app.json(s),200==s.response)a.app.UID(n,o||'<center> "Successfully Executed."</center>',"success"),a.cFetched[e]=s.data.message,a.data[t.toString().replace(/vw_/gi,"")]={};else{if(Array.isArray(s.data.message)){var i=s.data.message[2].match(/DETAIL:(.*)/);void 0!=i||null!=i?s.data.message=i[1]:s.data.message=s.data.message[2]}else s.data.message;a.app.alert("ERROR","<center>"+s.data.message+"</center>",a.app.doNothing,"CONTINUE")}a.$apply()})},a.sort=function(e){a.sortKey=e,a.reverse=!a.reverse},a.dPush=function(e,a,t){e[a]=t},a.currmoin=a.app.monthNum(),a.setMoin=function(e){a.currmoin=e}}])},{}],3:[function(e,a,t){app.controller("entitiesController",["$scope","$ionicModal",function(e,a){e.current=[],e.editing=!1,e.editEntity=function(a){e.current=a,e.editing=!0},e.clearEntity=function(){e.current=[],e.editing=!1}}])},{}],4:[function(e,a,t){e("./app.ctrl.js"),e("./app-sample.ctrl.js"),e("./formly.ctrl.js"),e("./entitiesCtrl.js"),e("./hospital.ctrl.js"),e("./socket.ctrl.js")},{"./app-sample.ctrl.js":1,"./app.ctrl.js":2,"./entitiesCtrl.js":3,"./formly.ctrl.js":5,"./hospital.ctrl.js":6,"./socket.ctrl.js":7}],5:[function(e,a,t){app.controller("AuthController",["$scope","$http",function(e,a){e.vm={},e.vm.onSubmit=function(){var a=function(a){200===a.response||"SUCCESS"===a.response?(e.app.UID("resp",e.app.str(a.data.message),"success"),e.vm.model={}):e.app.UID("resp",e.app.str(a.data.message),"danger")};e.app.cors(e.app.url+"/register",e.vm.model,a)},e.vm.model={terms:!0},e.vm.fields=[{key:"username",type:"inline-input",templateOptions:{label:"Username*",type:"text",placeholder:"Username",required:!0}},{key:"first_name",type:"inline-input",templateOptions:{label:"First Name*",type:"text",placeholder:"First Name",required:!0}},{key:"last_name",type:"inline-input",templateOptions:{label:"Last Name",type:"text",placeholder:"Last Name",required:!1}},{key:"password",type:"inline-input",templateOptions:{type:"password",label:"Password*",placeholder:"Password",disabled:!1,required:!0}},{key:"password2",type:"inline-input",templateOptions:{type:"password",label:"Repeat Password*",placeholder:"********",disabled:!1,required:!0}},{key:"telephone",type:"inline-input",templateOptions:{type:"text",label:"Telephone*",placeholder:"+123456789123",disabled:!1,required:!0}},{key:"postal_address",type:"inline-input",templateOptions:{type:"text",label:"Address",placeholder:"P.O BOX STH",disabled:!1,required:!1}},{key:"city",type:"inline-input",templateOptions:{type:"text",label:"City",placeholder:"SOME CITY",disabled:!1,required:!1}},{key:"zip",type:"inline-input",templateOptions:{type:"text",label:"ZIP",placeholder:"0000",disabled:!1,required:!1}},{key:"email",type:"inline-input",templateOptions:{type:"email",label:"Email*",placeholder:"john@doe.ext",disabled:!1,required:!0}},{key:"country",type:"countries",templateOptions:{label:"Country*"}},{key:"terms",type:"terms"},{type:"submit",key:"submit",templateOptions:{label:"Join Bixbyte",disabled:"!model.terms || form.$invalid"}},{type:"space",key:""}],e.vm.originalFields=angular.copy(e.vm.fields)}])},{}],6:[function(e,a,t){app.controller("hospitalCtrl",["$scope",function(e){e.loginRedirect=function(){window.location="/#/login"},e.setCreds=function(e){return e=e||{},e.token={user:"userAdmin",key:"153797e5fc6433812172aa8d47ec69e1",specifics:"Direct user request (signup,appointments)"},e},e.newAppontment=function(e){},e.nextAppointment=function(a){var t=[{telephone:e.appointmentTelephone,message:"Hello "+e.appointmentTitle+", you have a new appointment request to review on the matibabu portal.",password:"355912060268866"},{telephone:a.telephone,message:"Thank you "+a.name+", your request for an appointment has been received. "+e.appointmentTitle+" will get back to you as soon as possible.",password:"355912060268866"}];t.forEach(function(a){e.sms.oneSMS(a.telephone,a.message,a.password)}),e.bookAppointment=!1},e.setAppointment=function(a){e.bookAppointment=!0,e.appointmentId=a.entity_id,e.appointmentTitle=a.title,e.appointmentTelephone=a.telephone},e.clearAppointment=function(){e.bookAppointment=!1},e.sudo=function(a,t){return t&&a?(a.token={},a.token={user:"userAdmin",key:"153797e5fc6433812172aa8d47ec69e1",specifics:t},a):(e.app.alert("Error","<center>User credentials are required in order to invoke the sudo function</center>"),{})}}])},{}],7:[function(e,a,t){app.controller("socketCtrl",["$scope",function(e){e.server={},e.server.host="127.0.0.1",e.server.port="3000",e.socket=io.connect("http://"+e.server.host+":"+e.server.port),e.socket.on("connect",function(){e.app.alert("CONNECTION ALERT","<center>SUCCESSFULLY ESTABLISHED A CONNECTION TO THE BIXBYTE SMS SERVER</center>",e.app.doNothing,"Continue")}),e.SMS=function(a,t,n){var o;o=Array.isArray(a)?a:{telephone:a,message:t,password:n},e.socket.emit("sendSMS",o)},e.socket.on("trueSMS",function(a){e.app.alert("SMS SENT","The message has been conveyed.",e.app.doNothing,"Continue")})}])},{}]},{},[4]);