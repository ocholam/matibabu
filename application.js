"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},_typeof2="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(e){return"undefined"==typeof e?"undefined":_typeof(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":"undefined"==typeof e?"undefined":_typeof(e)};!function e(a,n,t){function i(o,u){if(!n[o]){if(!a[o]){var r="function"==typeof require&&require;if(!u&&r)return r(o,!0);if(l)return l(o,!0);throw new Error("Cannot find module '"+o+"'")}var s=n[o]={exports:{}};a[o][0].call(s.exports,function(e){var n=a[o][1][e];return i(n?n:e)},s,s.exports,e,a,n,t)}return n[o].exports}for(var l="function"==typeof require&&require,o=0;o<t.length;o++)i(t[o]);return i}({1:[function(e,a,n){app.config(["$stateProvider","$urlRouterProvider","ChartJsProvider",function(e,a,n){e.state("framify",{url:"/framify",templateUrl:"views/adminLogin.html",controller:"appController",cache:!1});var t=function(a){a=a||[],a.forEach(function(a,n){e.state(a.path,{url:a.url,templateUrl:a.view,controller:a.controller,cache:!1})})};$.getJSON("./config/app-routes.json",function(e){t(e)}),a.otherwise("/framify"),n.setOptions({colours:["#4AB151","#387EF5","#FF0000","#DCDCDC","#46BFBD","#FDB45C","#949FB1","#4D5360"]})}]),app.run(["app","cgi","$rootScope","$location","formlyConfig","formlyValidationMessages","$localStorage",function(e,a,n,t,i,l,o){n.location=t,n.storage=o,n.app=e,n.cgi=a,n.frame={},n.frame.path=function(){return t.absUrl().split("/#/")[0]+"/#/"+t.absUrl().split("/#/")[1].split("#")[0]},n.frame.relocate=function(e){console.log("Relocating to: #"+e),n.location="#"+e},n.frame.is_admin=!1,n.frame.isAdmin=function(){return n.frame.is_admin?!0:!1},n.frame.isRoot=function(){return 0==n.storage.admin.access?!0:!1},n.frame.changeAdmin=function(e){n.frame.is_admin=e},n.frame.reset=function(){delete n.storage.admin,delete n.storage.user,n.frame.changeAdmin(!1),window.location="/#/"},i.setType({name:"submit",template:'<div id="resp"></div><br><button type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--blue mdl-cell mdl-cell--2-col" style="min-width: 200px; margin:10px; min-height:25px; color:whitesmoke; font-weight:bold;" ng-hide="{{options.templateOptions.disabled}}">{{options.templateOptions.label}}</button>',defaultOptions:{templateOptions:{label:"SAVE"}}}),i.setType({name:"btn",template:'<div id="resp"></div><br><button type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--blue" style="min-width: 200px; margin:10px; min-height:25px; color:whitesmoke; font-weight:bold;" ng-hide="{{options.templateOptions.disabled}}">{{options.templateOptions.label}}</button>',defaultOptions:{templateOptions:{label:"SAVE"}}}),i.setType({name:"file-input",template:'<div class="formly-template-wrapper form-group" > \n        <label class="item item-input ">\n            <span class="input-label ng-binding">{{options.templateOptions.label}}</span>\n            <input type="file" ng-model="model[options.key]" ng-class="{\'ng-valid\':options.value}" placeholder="options.templateOptions.placeholder"  ng-hide="{{options.templateOptions.disabled}}" placeholder="image"></input>\n        </label>\n             ',defaultOptions:{templateOptions:{label:"Image"}}}),i.setType({name:"countries","extends":"select",defaultOptions:{templateOptions:{label:"Country",options:[{name:"Afghanistan",value:"1"},{name:"Albania",value:"2"},{name:"Algeria",value:"3"},{name:"American Samoa",value:"4"},{name:"Andorra",value:"5"},{name:"Angola",value:"6"},{name:"Anguilla",value:"7"},{name:"Antarctica",value:"8"},{name:"Antigua and Barbuda",value:"9"},{name:"Argentina",value:"10"},{name:"Armenia",value:"11"},{name:"Aruba",value:"12"},{name:"Australia",value:"13"},{name:"Austria",value:"14"},{name:"Azerbaijan",value:"15"},{name:"Bahamas",value:"16"},{name:"Bahrain",value:"17"},{name:"Bangladesh",value:"18"},{name:"Barbados",value:"19"},{name:"Belarus",value:"20"},{name:"Belgium",value:"21"},{name:"Belize",value:"22"},{name:"Benin",value:"23"},{name:"Bermuda",value:"24"},{name:"Bhutan",value:"25"},{name:"Bolivia",value:"26"},{name:"Bosnia and Herzegowina",value:"27"},{name:"Botswana",value:"28"},{name:"Bouvet Island",value:"29"},{name:"Brazil",value:"30"},{name:"British Indian Ocean Territory",value:"31"},{name:"Brunei Darussalam",value:"32"},{name:"Bulgaria",value:"33"},{name:"Burkina Faso",value:"34"},{name:"Burundi",value:"35"},{name:"Cambodia",value:"36"},{name:"Cameroon",value:"37"},{name:"Canada",value:"38"},{name:"Cape Verde",value:"39"},{name:"Cayman Islands",value:"40"},{name:"Central African Republic",value:"41"},{name:"Chad",value:"42"},{name:"Chile",value:"43"},{name:"China",value:"44"},{name:"Christmas Island",value:"45"},{name:"Cocos (Keeling) Islands",value:"46"},{name:"Colombia",value:"47"},{name:"Comoros",value:"48"},{name:"Congo",value:"49"},{name:"Congo, the Democratic Republic of the",value:"50"},{name:"Cook Islands",value:"51"},{name:"Costa Rica",value:"52"},{name:"Cote d'Ivoire",value:"53"},{name:"Croatia (Hrvatska)",value:"54"},{name:"Cuba",value:"55"},{name:"Cyprus",value:"56"},{name:"Czech Republic",value:"57"},{name:"Denmark",value:"58"},{name:"Djibouti",value:"59"},{name:"Dominica",value:"60"},{name:"Dominican Republic",value:"61"},{name:"East Timor",value:"62"},{name:"Ecuador",value:"63"},{name:"Egypt",value:"64"},{name:"El Salvador",value:"65"},{name:"Equatorial Guinea",value:"66"},{name:"Eritrea",value:"67"},{name:"Estonia",value:"68"},{name:"Ethiopia",value:"69"},{name:"Falkland Islands (Malvinas)",value:"70"},{name:"Faroe Islands",value:"71"},{name:"Fiji",value:"72"},{name:"Finland",value:"73"},{name:"France",value:"74"},{name:"France Metropolitan",value:"75"},{name:"French Guiana",value:"76"},{name:"French Polynesia",value:"77"},{name:"French Southern Territories",value:"78"},{name:"Gabon",value:"79"},{name:"Gambia",value:"80"},{name:"Georgia",value:"81"},{name:"Germany",value:"82"},{name:"Ghana",value:"83"},{name:"Gibraltar",value:"84"},{name:"Greece",value:"85"},{name:"Greenland",value:"86"},{name:"Grenada",value:"87"},{name:"Guadeloupe",value:"88"},{name:"Guam",value:"89"},{name:"Guatemala",value:"90"},{name:"Guinea",value:"91"},{name:"Guinea-Bissau",value:"92"},{name:"Guyana",value:"93"},{name:"Haiti",value:"94"},{name:"Heard and Mc Donald Islands",value:"95"},{name:"Holy See (Vatican City State)",value:"96"},{name:"Honduras",value:"97"},{name:"Hong Kong",value:"98"},{name:"Hungary",value:"99"},{name:"Iceland",value:"100"},{name:"India",value:"101"},{name:"Indonesia",value:"102"},{name:"Iran (Islamic Republic of)",value:"103"},{name:"Iraq",value:"104"},{name:"Ireland",value:"105"},{name:"Israel",value:"106"},{name:"Italy",value:"107"},{name:"Jamaica",value:"108"},{name:"Japan",value:"109"},{name:"Jordan",value:"110"},{name:"Kazakhstan",value:"111"},{name:"Kenya",value:"112"},{name:"Kiribati",value:"113"},{name:"Korea, Democratic People's Republic of",value:"114"},{name:"Korea, Republic of",value:"115"},{name:"Kuwait",value:"116"},{name:"Kyrgyzstan",value:"117"},{name:"Lao, People's Democratic Republic",value:"118"},{name:"Latvia",value:"119"},{name:"Lebanon",value:"120"},{name:"Lesotho",value:"121"},{name:"Liberia",value:"122"},{name:"Libyan Arab Jamahiriya",value:"123"},{name:"Liechtenstein",value:"124"},{name:"Lithuania",value:"125"},{name:"Luxembourg",value:"126"},{name:"Macau",value:"127"},{name:"Macedonia, The Former Yugoslav Republic of",value:"128"},{name:"Madagascar",value:"129"},{name:"Malawi",value:"130"},{name:"Malaysia",value:"131"},{name:"Maldives",value:"132"},{name:"Mali",value:"133"},{name:"Malta",value:"134"},{name:"Marshall Islands",value:"135"},{name:"Martinique",value:"136"},{name:"Mauritania",value:"137"},{name:"Mauritius",value:"138"},{name:"Mayotte",value:"139"},{name:"Mexico",value:"140"},{name:"Micronesia, Federated States of",value:"141"},{name:"Moldova, Republic of",value:"142"},{name:"Monaco",value:"143"},{name:"Mongolia",value:"144"},{name:"Montserrat",value:"145"},{name:"Morocco",value:"146"},{name:"Mozambique",value:"147"},{name:"Myanmar",value:"148"},{name:"Namibia",value:"149"},{name:"Nauru",value:"150"},{name:"Nepal",value:"151"},{name:"Netherlands",value:"152"},{name:"Netherlands Antilles",value:"153"},{name:"New Caledonia",value:"154"},{name:"New Zealand",value:"155"},{name:"Nicaragua",value:"156"},{name:"Niger",value:"157"},{name:"Nigeria",value:"158"},{name:"Niue",value:"159"},{name:"Norfolk Island",value:"160"},{name:"Northern Mariana Islands",value:"161"},{name:"Norway",value:"162"},{name:"Oman",value:"163"},{name:"Pakistan",value:"164"},{name:"Palau",value:"165"},{name:"Panama",value:"166"},{name:"Papua New Guinea",value:"167"},{name:"Paraguay",value:"168"},{name:"Peru",value:"169"},{name:"Philippines",value:"170"},{name:"Pitcairn",value:"171"},{name:"Poland",value:"172"},{name:"Portugal",value:"173"},{name:"Puerto Rico",value:"174"},{name:"Qatar",value:"175"},{name:"Reunion",value:"176"},{name:"Romania",value:"177"},{name:"Russian Federation",value:"178"},{name:"Rwanda",value:"179"},{name:"Saint Kitts and Nevis",value:"180"},{name:"Saint Lucia",value:"181"},{name:"Saint Vincent and the Grenadines",value:"182"},{name:"Samoa",value:"183"},{name:"San Marino",value:"184"},{name:"Sao Tome and Principe",value:"185"},{name:"Saudi Arabia",value:"186"},{name:"Senegal",value:"187"},{name:"Seychelles",value:"188"},{name:"Sierra Leone",value:"189"},{name:"Singapore",value:"190"},{name:"Slovakia (Slovak Republic)",value:"191"},{name:"Slovenia",value:"192"},{name:"Solomon Islands",value:"193"},{name:"Somalia",value:"194"},{name:"South Africa",value:"195"},{name:"South Georgia and the South Sandwich Islands",value:"196"},{name:"South Sudan",value:"197"},{name:"Spain",value:"198"},{name:"Sri Lanka",value:"199"},{name:"St. Helena",value:"200"},{name:"St. Pierre and Miquelon",value:"201"},{name:"Sudan",value:"202"},{name:"Suriname",value:"203"},{name:"Svalbard and Jan Mayen Islands",value:"204"},{name:"Swaziland",value:"205"},{name:"Sweden",value:"206"},{name:"Switzerland",value:"207"},{name:"Syrian Arab Republic",value:"208"},{name:"Taiwan, Province of China",value:"209"},{name:"Tajikistan",value:"210"},{name:"Tanzania, United Republic of",value:"211"},{name:"Thailand",value:"212"},{name:"Togo",value:"213"},{name:"Tokelau",value:"214"},{name:"Tonga",value:"215"},{name:"Trinidad and Tobago",value:"216"},{name:"Tunisia",value:"217"},{name:"Turkey",value:"218"},{name:"Turkmenistan",value:"219"},{name:"Turks and Caicos Islands",value:"220"},{name:"Tuvalu",value:"221"},{name:"Uganda",value:"222"},{name:"Ukraine",value:"223"},{name:"United Arab Emirates",value:"224"},{name:"United Kingdom",value:"225"},{name:"United States",value:"226"},{name:"United States Minor Outlying Islands",value:"227"},{name:"Uruguay",value:"228"},{name:"Uzbekistan",value:"229"},{name:"Vanuatu",value:"230"},{name:"Venezuela",value:"231"},{name:"Vietnam",value:"232"},{name:"Virgin Islands (British)",value:"233"},{name:"Virgin Islands (U.S.)",value:"234"},{name:"Wallis and Futuna Islands",value:"235"},{name:"Western Sahara",value:"236"},{name:"Yemen",value:"237"},{name:"Yugoslavia",value:"238"},{name:"Zambia",value:"239"},{name:"Zimbabwe",value:"240"}]}}}),i.setType({name:"terms","extends":"checkbox",defaultOptions:{templateOptions:{label:"Accept Terms and conditions",description:"I Agree to all the terms of use",disabled:!1,checked:!1}}}),i.setType({name:"space",template:"<br><br><br><br><br>",defaultOptions:{templateOptions:{required:!1}}})}]),app.filter("startFrom",function(){return function(e,a){return a=+a,e.slice(a)}})},{}],2:[function(e,a,n){a.exports=angular.module("bixFrame",["ionic","framify-paginate","formlyIonic","ngStorage","jsonFormatter","ngMaterial","ionic-material","ngMessages","chart.js"])},{}],3:[function(e,a,n){var t="function"==typeof Symbol&&"symbol"==_typeof2(Symbol.iterator)?function(e){return"undefined"==typeof e?"undefined":_typeof2(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":"undefined"==typeof e?"undefined":_typeof2(e)};!function i(a,n,t){function l(u,r){if(!n[u]){if(!a[u]){var s="function"==typeof e&&e;if(!r&&s)return s(u,!0);if(o)return o(u,!0);throw new Error("Cannot find module '"+u+"'")}var m=n[u]={exports:{}};a[u][0].call(m.exports,function(e){var n=a[u][1][e];return l(n?n:e)},m,m.exports,i,a,n,t)}return n[u].exports}for(var o="function"==typeof e&&e,u=0;u<t.length;u++)l(t[u]);return l}({1:[function(e,a,n){app.controller("framifySampleController",["$scope","$http",function(e,a){e.voters=[];var n=function(a){console.log("SETTING VOTERS"),e.voters=a};e.customify=function(a){e.app.alert(e.nav.alias||e.nav.title,"<center>DONE!</center>",e.app.doNothing)},e.sav=function(){e.app.confirm(e.nav.alias||e.nav.title,"Do you really want to save this widget",e.customify)},e.del=function(){e.app.confirm(e.nav.alias||e.nav.title,"Are you sure you want to DELETE this widget",e.customify)},e.app.getJSON("./sample/sample.json",n),e.testify=function(){return"Correct!!"},e.labels=["January","February","March","April","May","June","July"],e.series=["Series A","Series B"],e.data=[[65,59,80,81,56,55,40],[28,48,40,19,86,27,90]],e.onClick=function(e,a){console.log(e,a)},e.datasetOverride=[{yAxisID:"y-axis-1"},{yAxisID:"y-axis-2"}],e.options={scales:{yAxes:[{id:"y-axis-1",type:"linear",display:!0,position:"left"},{id:"y-axis-2",type:"linear",display:!0,position:"right"}]}}}])},{}],2:[function(e,a,n){app.controller("appController",["app","$scope","$location","$ionicModal","$rootScope","$ionicSideMenuDelegate","$ionicSlideBoxDelegate",function(e,a,n,i,l,o,u){a.current={},a.ui={},l.nav=[],l.links=[],a.nav.hasFilters=!1,a.nav.right={},a.nav.right.toggle=function(){o.toggleRight()},a.nav.left={},a.nav.left.toggle=function(){o.toggleLeft()},a.openFilters=function(e){e===!0?a.nav.hasFilters=!1:a.nav.hasFilters=!0};var r=function(e){a.links=e},s=function(e){a.nav=e};a.app.getData(s),a.app.getRoutes(r),l.app.reinit=function(){a.location.path("/framify")},l.app.navSlide=function(e){u.slide(e,500)},a.ui.modal=function(e,n,t,l){e=e||"views/login.html",i.fromTemplateUrl(e,{scope:a,animation:n||"slide-in-up"}).then(function(e){a.current.modal=e}),a.current.openModal=function(){a.current.modal.show()},a.current.closeModal=function(){a.current.modal.hide()},a.$on("$destroy",function(){a.current.modal.remove()}),a.$on("current.modal.hidden",t),a.$on("current.modal.removed",l)},l.exec=function(e){return e()},l.secure=function(e){var n=window.location.href.split("/"),t=n[n.length-1];a.links.indexOf(t)>=0&&l.exec(e)},a.add={},a.fetch={},a.fetched={},a.data={},a.data.login={},a.data.admin={},l.frame.changeAdmin(!1),a.logedin=!1,a.add=function(e,n,t,i){n=n?a.app.json(n):{},n.command="add",n.table=void 0!=e?e.toString().replace(/vw_/gi,""):"",n.token=n.token||a.storage.admin._,n.extras=n&&n.extras?n.extras.replace(/LIMIT 1/gi,""):void 0,i&&i.split(",").forEach(function(e){n[e]=a.app.md5(n[e])}),a.cgi.ajax(n).then(function(i){if(i=a.app.json(i),200==i.response)a.app.UID(t,'<center> "Record Successfully Added."</center>',"success"),a.fetch(e,{specifics:n.specifics}),a.data[n.toString().replace(/vw_/gi,"")]={};else{if(Array.isArray(i.data.message)){var l=i.data.message[2].match(/DETAIL:(.*)/);void 0!=l||null!=l?i.data.message=l[1]:i.data.message=i.data.message[2]}else i.data.message;a.app.alert("ERROR","<center>"+i.data.message+"</center>",a.app.doNothing,"CONTINUE")}a.$apply()})},a.update=function(e,n,t,i){n=n?a.app.json(n):{},n.command="update",n.table=void 0!=e?e.toString().replace(/vw_/gi,""):"",n.token=n.token||a.storage.admin._,n.extras=n&&n.extras?n.extras.replace(/LIMIT 1/gi,""):void 0,i&&i.split(",").forEach(function(e){n[e]=a.app.md5(n[e])}),a.cgi.ajax(n).then(function(i){if(i=a.app.json(i),200==i.response)a.app.UID(t,'<center> "Record Successfully Updated."</center>',"success"),a.fetch(e,{specifics:n.specifics}),a.data[n.toString().replace(/vw_/gi,"")]={};else{if(Array.isArray(i.data.message)){var l=i.data.message[2].match(/DETAIL:(.*)/);void 0!=l||null!=l?i.data.message=l[1]:i.data.message=i.data.message[2]}else i.data.message;a.app.alert("ERROR","<center>"+i.data.message+"</center>",a.app.doNothing,"CONTINUE")}a.$apply()})};var m=function(e,n,t){n=n?a.app.json(n):{},n.command="get",n.table=e,a.cgi.ajax(n).then(function(n){if(n=a.app.json(n),200==n.response)a.fetched[e]=n.data.message;else{if(Array.isArray(n.data.message)){var t=n.data.message[2].match(/DETAIL:(.*)/);void 0!=t||null!=t?n.data.message=t[1]:n.data.message=n.data.message[2]}else n.data.message;a.app.alert("ERROR","<center>"+n.data.message+"</center>",a.app.doNothing,"CONTINUE")}a.$apply()})};a.fetch=function(e,a,n){Array.isArray(e)?e.forEach(function(e,a){return m(e[0],e[1],e[2])}):m(e,a,n)},a.del=function(e,n,t,i){n=n?a.app.json(n):{},n.command="del",n.table=void 0!=e?e.toString().replace(/vw_/gi,""):"",n.token=n.token||a.storage.admin._,a.cgi.ajax(n).then(function(n){if(n=a.app.json(n),200==n.response)a.fetched[e].splice(i,1),a.app.UID("response","<center>Deleted.</center>","info");else{if(Array.isArray(n.data.message)){var t=n.data.message[2].match(/DETAIL:(.*)/);void 0!=t||null!=t?n.data.message=t[1]:n.data.message=n.data.message[2]}else n.data.message;a.app.alert("ERROR","<center>"+n.data.message+"</center>",a.app.doNothing,"CONTINUE")}a.$apply()})},a.login=function(e){e&&(a.data.login[e]=a.app.md5(a.data.login[e])),a.data.login.command="get",a.data.login.table="users",a.data.login.extras=" AND active is true LIMIT 1",a.cgi.ajax(a.data.login).then(function(e){if(a.data.admin.extras="",e=a.app.json(e),200==e.response)e.data.message.length>0&&"object"==t(e.data.message[0])?e.data.message[0].username==a.data.login.username?(a.storage.user=e.data.message[0],a.logedin=!0):(delete a.storage.user,window.location="/#/"):(delete a.storage.user,a.app.UID("response","<center>You have entered the wrong login credentials.</center>","danger"));else{if(Array.isArray(e.data.message)){var n=e.data.message[2].match(/DETAIL:(.*)/);void 0!=n||null!=n?e.data.message=n[1]:e.data.message=e.data.message[2]}else e.data.message;a.app.alert("ERROR","<center>"+e.data.message+"</center>",a.app.doNothing,"CONTINUE"),delete a.storage.user}a.$apply()})},a.adminLogin=function(e){e&&(a.data.admin[e]=a.app.md5(a.data.admin[e])),a.data.admin.command="get",a.data.admin.table="admins",a.data.admin.extras=" AND active is true LIMIT 1",a.cgi.ajax(a.data.admin).then(function(e){if(a.data.admin.extras="",e=a.app.json(e),200==e.response)e.data.message.length>0&&void 0!=t(e.data.message[0])?e.data.message[0].password===a.data.admin.password?(a.storage.admin=e.data.message[0],a.storage.admin._={},a.storage.admin._.user=e.data.message[0].admin_name,a.storage.admin._.key=e.data.message[0].password,l.frame.changeAdmin(!0)):(delete a.data.admin,delete a.storage.admin,window.location="/#/admin"):(delete a.data.admin,delete a.storage.admin,a.app.UID("response","<center>You have entered the wrong login credentials.</center>","danger"),window.location="/#/admin");else{if(Array.isArray(e.data.message)){var n=e.data.message[2].match(/DETAIL:(.*)/);void 0!=n||null!=n?e.data.message=n[1]:e.data.message=e.data.message[2]}else e.data.message;a.app.alert("ERROR","<center>"+e.data.message+"</center>",a.app.doNothing,"CONTINUE"),delete a.storage.admin}a.$apply()})},a.islogedin=function(){a.storage.user&&(a.data.login.username=a.storage.user.username,a.data.login.password=a.storage.user.password,a.login())},a.logout=function(){a.islogedin=!1,delete a.storage.user,window.location="/#/"},a.authorize=function(){a.storage.admin?(a.data.admin={},a.data.admin.admin_name=a.storage.admin.admin_name,a.data.admin.password=a.storage.admin.password,a.adminLogin()):a.location="/#/admin"},a.deauthorize=function(){delete a.storage.admin,l.frame.changeAdmin(!1),window.location="/#/"},a.custom=function(e,n,t,i){n=n?a.app.json(n):{},n.command="custom",n.token=n.token||a.storage.admin._,console.dir(n),a.cgi.ajax(n).then(function(l){if(l=a.app.json(l),200==l.response)a.app.UID(t,i||'<center> "Successfully Executed."</center>',"success"),a.cFetched[e]=l.data.message,a.data[n.toString().replace(/vw_/gi,"")]={};else{if(Array.isArray(l.data.message)){var o=l.data.message[2].match(/DETAIL:(.*)/);void 0!=o||null!=o?l.data.message=o[1]:l.data.message=l.data.message[2]}else l.data.message;a.app.alert("ERROR","<center>"+l.data.message+"</center>",a.app.doNothing,"CONTINUE")}a.$apply()})},a.sort=function(e){a.sortKey=e,a.reverse=!a.reverse},a.currmoin=a.app.monthNum(),a.setMoin=function(e){a.currmoin=e}}])},{}],3:[function(e,a,n){app.controller("entitiesController",["$scope","$ionicModal",function(e,a){e.current=[],e.editing=!1,e.editEntity=function(a){e.current=a,e.editing=!0},e.clearEntity=function(){e.current=[],e.editing=!1}}])},{}],4:[function(e,a,n){e("./app.ctrl.js"),e("./app-sample.ctrl.js"),e("./formly.ctrl.js"),e("./entitiesCtrl.js")},{"./app-sample.ctrl.js":1,"./app.ctrl.js":2,"./entitiesCtrl.js":3,"./formly.ctrl.js":5}],5:[function(e,a,n){app.controller("AuthController",["$scope","$http",function(e,a){e.vm={},e.vm.onSubmit=function(){var a=function(a){200===a.response||"SUCCESS"===a.response?(e.app.UID("resp",e.app.str(a.data.message),"success"),e.vm.model={}):e.app.UID("resp",e.app.str(a.data.message),"danger")};e.app.cors(e.app.url+"/register",e.vm.model,a)},e.vm.model={terms:!0},e.vm.fields=[{key:"username",type:"inline-input",templateOptions:{label:"Username*",type:"text",placeholder:"Username",required:!0}},{key:"first_name",type:"inline-input",templateOptions:{label:"First Name*",type:"text",placeholder:"First Name",required:!0}},{key:"last_name",type:"inline-input",templateOptions:{label:"Last Name",type:"text",placeholder:"Last Name",required:!1}},{key:"password",type:"inline-input",templateOptions:{type:"password",label:"Password*",placeholder:"Password",disabled:!1,required:!0}},{key:"password2",type:"inline-input",templateOptions:{type:"password",label:"Repeat Password*",placeholder:"********",disabled:!1,required:!0}},{key:"telephone",type:"inline-input",templateOptions:{type:"text",label:"Telephone*",placeholder:"+123456789123",disabled:!1,required:!0}},{key:"postal_address",type:"inline-input",templateOptions:{type:"text",label:"Address",placeholder:"P.O BOX STH",disabled:!1,required:!1}},{key:"city",type:"inline-input",templateOptions:{type:"text",label:"City",placeholder:"SOME CITY",disabled:!1,required:!1}},{key:"zip",type:"inline-input",templateOptions:{type:"text",label:"ZIP",placeholder:"0000",disabled:!1,required:!1}},{key:"email",type:"inline-input",templateOptions:{type:"email",label:"Email*",placeholder:"john@doe.ext",disabled:!1,required:!0}},{key:"country",type:"countries",templateOptions:{label:"Country*"}},{key:"terms",type:"terms"},{type:"submit",key:"submit",templateOptions:{label:"Join Bixbyte",disabled:"!model.terms || form.$invalid"}},{type:"space",key:""}],e.vm.originalFields=angular.copy(e.vm.fields)}])},{}]},{},[4])},{}],4:[function(e,a,n){!function t(a,n,i){function l(u,r){if(!n[u]){if(!a[u]){var s="function"==typeof e&&e;if(!r&&s)return s(u,!0);if(o)return o(u,!0);throw new Error("Cannot find module '"+u+"'")}var m=n[u]={exports:{}};a[u][0].call(m.exports,function(e){var n=a[u][1][e];return l(n?n:e)},m,m.exports,t,a,n,i)}return n[u].exports}for(var o="function"==typeof e&&e,u=0;u<i.length;u++)l(i[u]);return l}({1:[function(e,a,n){app.directive("appSample",function(){return{restrict:"E",controller:"framifySampleController",templateUrl:"views/2app-sample.html"}})},{}],2:[function(e,a,n){app.directive("appDirective",function(){return{restrict:"E",controller:"appController"}})},{}],3:[function(e,a,n){e("./app.dir.js"),e("./app-sample.dir.js"),e("./file-model.dir.js")},{"./app-sample.dir.js":1,"./app.dir.js":2,"./file-model.dir.js":4}],4:[function(e,a,n){app.directive("fileModel",["$parse",function(e){return{restrict:"A",link:function(a,n,t){var i=e(t.fileModel),l=i.assign;n.bind("change",function(){a.$apply(function(){l(a,n[0].files[0])})})}}}])},{}]},{},[3])},{}],5:[function(e,a,n){var t="function"==typeof Symbol&&"symbol"==_typeof2(Symbol.iterator)?function(e){return"undefined"==typeof e?"undefined":_typeof2(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":"undefined"==typeof e?"undefined":_typeof2(e)};!function i(a,n,t){function l(u,r){if(!n[u]){if(!a[u]){var s="function"==typeof e&&e;if(!r&&s)return s(u,!0);if(o)return o(u,!0);throw new Error("Cannot find module '"+u+"'")}var m=n[u]={exports:{}};a[u][0].call(m.exports,function(e){var n=a[u][1][e];return l(n?n:e)},m,m.exports,i,a,n,t)}return n[u].exports}for(var o="function"==typeof e&&e,u=0;u<t.length;u++)l(t[u]);return l}({1:[function(e,a,n){(function(e){app.service("app",["$http","$ionicPopup",function(a,n){var i=this,l=window.location.href.split("/").filter(function(e){return""!=e&&"http:"!=e&&"https:"!=e});this.ip=l[0].split(":")[0],this.port=l[0].split(":")[1],this.hlink="http://"+this.ip+":"+this.port,e.hlink=this.hlink,this.upload=function(e,n){var t=new FormData;for(var i in e)t.append(i,e[i]);return a.post(hlink+"/upload/"+n,t,{transformRequest:angular.identity,headers:{"Content-Type":void 0}})},this.url=this.hlink,this.parseInt=function(e){return parseInt(e)},this.doNothing=function(){};var o;this.UID=function(e,a,n){clearTimeout(o),e=e?e:"response",document.getElementById(e).innerHTML="<div class='alert alert-"+n+"'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"+a+"</div>",o=setTimeout(function(){document.getElementById(e).innerHTML=""},15e3)},this.getData=function(e,a){$.getJSON("./config/app.json",function(a){e(a)})},this.getRoutes=function(e,a){$.getJSON("./config/app-routes.json",function(a){e(a)})},this.countries=[{name:"Afghanistan",value:"1"},{name:"Albania",value:"2"},{name:"Algeria",value:"3"},{name:"American Samoa",value:"4"},{name:"Andorra",value:"5"},{name:"Angola",value:"6"},{name:"Anguilla",value:"7"},{name:"Antarctica",value:"8"},{name:"Antigua and Barbuda",value:"9"},{name:"Argentina",value:"10"},{name:"Armenia",value:"11"},{name:"Aruba",value:"12"},{name:"Australia",value:"13"},{name:"Austria",value:"14"},{name:"Azerbaijan",value:"15"},{name:"Bahamas",value:"16"},{name:"Bahrain",value:"17"},{name:"Bangladesh",value:"18"},{name:"Barbados",value:"19"},{name:"Belarus",value:"20"},{name:"Belgium",value:"21"},{name:"Belize",value:"22"},{name:"Benin",value:"23"},{name:"Bermuda",value:"24"},{name:"Bhutan",value:"25"},{name:"Bolivia",value:"26"},{name:"Bosnia and Herzegowina",value:"27"},{name:"Botswana",value:"28"},{name:"Bouvet Island",value:"29"},{name:"Brazil",value:"30"},{name:"British Indian Ocean Territory",value:"31"},{name:"Brunei Darussalam",value:"32"},{name:"Bulgaria",value:"33"},{name:"Burkina Faso",value:"34"},{name:"Burundi",value:"35"},{name:"Cambodia",value:"36"},{name:"Cameroon",value:"37"},{name:"Canada",value:"38"},{name:"Cape Verde",value:"39"},{name:"Cayman Islands",value:"40"},{name:"Central African Republic",value:"41"},{name:"Chad",value:"42"},{name:"Chile",value:"43"},{name:"China",value:"44"},{name:"Christmas Island",value:"45"},{name:"Cocos (Keeling) Islands",value:"46"},{name:"Colombia",value:"47"},{name:"Comoros",value:"48"},{name:"Congo",value:"49"},{name:"Congo, the Democratic Republic of the",value:"50"},{name:"Cook Islands",value:"51"},{name:"Costa Rica",value:"52"},{name:"Cote d'Ivoire",value:"53"},{name:"Croatia (Hrvatska)",value:"54"},{name:"Cuba",value:"55"},{name:"Cyprus",value:"56"},{name:"Czech Republic",value:"57"},{name:"Denmark",value:"58"},{name:"Djibouti",value:"59"},{name:"Dominica",value:"60"},{name:"Dominican Republic",value:"61"},{name:"East Timor",value:"62"},{name:"Ecuador",value:"63"},{name:"Egypt",value:"64"},{name:"El Salvador",value:"65"},{name:"Equatorial Guinea",value:"66"},{name:"Eritrea",value:"67"},{name:"Estonia",value:"68"},{name:"Ethiopia",value:"69"},{name:"Falkland Islands (Malvinas)",value:"70"},{name:"Faroe Islands",value:"71"},{name:"Fiji",value:"72"},{name:"Finland",value:"73"},{name:"France",value:"74"},{name:"France Metropolitan",value:"75"},{name:"French Guiana",value:"76"},{name:"French Polynesia",value:"77"},{name:"French Southern Territories",value:"78"},{name:"Gabon",value:"79"},{name:"Gambia",value:"80"},{name:"Georgia",value:"81"},{name:"Germany",value:"82"},{name:"Ghana",value:"83"},{name:"Gibraltar",value:"84"},{name:"Greece",value:"85"},{name:"Greenland",value:"86"},{name:"Grenada",value:"87"},{name:"Guadeloupe",value:"88"},{name:"Guam",value:"89"},{name:"Guatemala",value:"90"},{name:"Guinea",value:"91"},{name:"Guinea-Bissau",value:"92"},{name:"Guyana",value:"93"},{name:"Haiti",value:"94"},{name:"Heard and Mc Donald Islands",value:"95"},{name:"Holy See (Vatican City State)",value:"96"},{name:"Honduras",value:"97"},{name:"Hong Kong",value:"98"},{name:"Hungary",value:"99"},{name:"Iceland",value:"100"},{name:"India",value:"101"},{name:"Indonesia",value:"102"},{name:"Iran (Islamic Republic of)",value:"103"},{name:"Iraq",value:"104"},{name:"Ireland",value:"105"},{name:"Israel",value:"106"},{name:"Italy",value:"107"},{name:"Jamaica",value:"108"},{name:"Japan",value:"109"},{name:"Jordan",value:"110"},{name:"Kazakhstan",value:"111"},{name:"Kenya",value:"112"},{name:"Kiribati",value:"113"},{name:"Korea, Democratic People's Republic of",value:"114"},{name:"Korea, Republic of",value:"115"},{name:"Kuwait",value:"116"},{name:"Kyrgyzstan",value:"117"},{name:"Lao, People's Democratic Republic",value:"118"},{name:"Latvia",value:"119"},{name:"Lebanon",value:"120"},{name:"Lesotho",value:"121"},{name:"Liberia",value:"122"},{name:"Libyan Arab Jamahiriya",value:"123"},{name:"Liechtenstein",value:"124"},{name:"Lithuania",value:"125"},{name:"Luxembourg",value:"126"},{name:"Macau",value:"127"},{name:"Macedonia, The Former Yugoslav Republic of",value:"128"},{name:"Madagascar",value:"129"},{name:"Malawi",value:"130"},{name:"Malaysia",value:"131"},{name:"Maldives",value:"132"},{name:"Mali",value:"133"},{name:"Malta",value:"134"},{name:"Marshall Islands",value:"135"},{name:"Martinique",value:"136"},{name:"Mauritania",value:"137"},{name:"Mauritius",value:"138"},{name:"Mayotte",value:"139"},{name:"Mexico",value:"140"},{name:"Micronesia, Federated States of",value:"141"},{name:"Moldova, Republic of",value:"142"},{name:"Monaco",value:"143"},{name:"Mongolia",value:"144"},{name:"Montserrat",value:"145"},{name:"Morocco",value:"146"},{name:"Mozambique",value:"147"},{name:"Myanmar",value:"148"},{name:"Namibia",value:"149"},{name:"Nauru",value:"150"},{name:"Nepal",value:"151"},{name:"Netherlands",value:"152"},{name:"Netherlands Antilles",value:"153"},{name:"New Caledonia",value:"154"},{name:"New Zealand",value:"155"},{name:"Nicaragua",value:"156"},{name:"Niger",value:"157"},{name:"Nigeria",value:"158"},{name:"Niue",value:"159"},{name:"Norfolk Island",value:"160"},{name:"Northern Mariana Islands",value:"161"},{name:"Norway",value:"162"},{name:"Oman",value:"163"},{name:"Pakistan",value:"164"},{name:"Palau",value:"165"},{name:"Panama",value:"166"},{name:"Papua New Guinea",value:"167"},{name:"Paraguay",value:"168"},{name:"Peru",value:"169"},{name:"Philippines",value:"170"},{name:"Pitcairn",value:"171"},{name:"Poland",value:"172"},{name:"Portugal",value:"173"},{name:"Puerto Rico",value:"174"},{name:"Qatar",value:"175"},{name:"Reunion",value:"176"},{name:"Romania",value:"177"},{name:"Russian Federation",value:"178"},{name:"Rwanda",value:"179"},{name:"Saint Kitts and Nevis",value:"180"},{name:"Saint Lucia",value:"181"},{name:"Saint Vincent and the Grenadines",value:"182"},{name:"Samoa",value:"183"},{name:"San Marino",value:"184"},{name:"Sao Tome and Principe",value:"185"},{name:"Saudi Arabia",value:"186"},{name:"Senegal",value:"187"},{name:"Seychelles",value:"188"},{name:"Sierra Leone",
value:"189"},{name:"Singapore",value:"190"},{name:"Slovakia (Slovak Republic)",value:"191"},{name:"Slovenia",value:"192"},{name:"Solomon Islands",value:"193"},{name:"Somalia",value:"194"},{name:"South Africa",value:"195"},{name:"South Georgia and the South Sandwich Islands",value:"196"},{name:"South Sudan",value:"197"},{name:"Spain",value:"198"},{name:"Sri Lanka",value:"199"},{name:"St. Helena",value:"200"},{name:"St. Pierre and Miquelon",value:"201"},{name:"Sudan",value:"202"},{name:"Suriname",value:"203"},{name:"Svalbard and Jan Mayen Islands",value:"204"},{name:"Swaziland",value:"205"},{name:"Sweden",value:"206"},{name:"Switzerland",value:"207"},{name:"Syrian Arab Republic",value:"208"},{name:"Taiwan, Province of China",value:"209"},{name:"Tajikistan",value:"210"},{name:"Tanzania, United Republic of",value:"211"},{name:"Thailand",value:"212"},{name:"Togo",value:"213"},{name:"Tokelau",value:"214"},{name:"Tonga",value:"215"},{name:"Trinidad and Tobago",value:"216"},{name:"Tunisia",value:"217"},{name:"Turkey",value:"218"},{name:"Turkmenistan",value:"219"},{name:"Turks and Caicos Islands",value:"220"},{name:"Tuvalu",value:"221"},{name:"Uganda",value:"222"},{name:"Ukraine",value:"223"},{name:"United Arab Emirates",value:"224"},{name:"United Kingdom",value:"225"},{name:"United States",value:"226"},{name:"United States Minor Outlying Islands",value:"227"},{name:"Uruguay",value:"228"},{name:"Uzbekistan",value:"229"},{name:"Vanuatu",value:"230"},{name:"Venezuela",value:"231"},{name:"Vietnam",value:"232"},{name:"Virgin Islands (British)",value:"233"},{name:"Virgin Islands (U.S.)",value:"234"},{name:"Wallis and Futuna Islands",value:"235"},{name:"Western Sahara",value:"236"},{name:"Yemen",value:"237"},{name:"Yugoslavia",value:"238"},{name:"Zambia",value:"239"},{name:"Zimbabwe",value:"240"}],this.makeResponse=function(e,a,n){return{response:e,data:{message:a,command:n}}},this.newDate=function(){return(new Date).toDateString()},this.isoDate=function(){return(new Date).format("isoDate")},this.newIsoDate=function(e){return new Date(e).format("isoDate")},this.toIsoDate=function(e){return e.format("isoDate")},this.monthNum=function(){return(new Date).format("monthNum")},this.newMonthNum=function(e){return new Date(e).format("monthNum")},this.toMonthNum=function(e){return e.format("monthNum")};var u=["January","February","March","April","May","June","July","August","September","October","November","December"];this.month_array=u,this.month_o_array=[{id:0,name:"January"},{id:1,name:"February"},{id:2,name:"March"},{id:3,name:"April"},{id:4,name:"May"},{id:5,name:"June"},{id:6,name:"July"},{id:7,name:"August"},{id:8,name:"September"},{id:9,name:"October"},{id:10,name:"November"},{id:11,name:"December"}],this.ajax=function(e,a,n,t,i){$.ajax({method:"POST",url:this.hlink+e,data:a,success:n,error:n})},this.cors=function(e,a,n,t,i){$.ajax({method:"POST",url:e,data:a,success:n,error:n})},this.getJSON=function(e,a){$.getJSON(e,function(e){a(e)})},this.JSON=function(e){return $.getJSON(e)},this.cgi=function(e,a){return $.ajax({method:"GET",url:e,data:a,dataType:"jsonp"})},this.loadify=function(e){e.html('<ion-spinner icon="lines" class="spinner-energized"></ion-spinner>')};var r=function(e,a,t,i){return n.alert({title:e,template:a,okText:i||"OK"}).then(function(e){"function"==typeof t&&t(e)},function(e){console.log("error",e)},function(e){e.close()})};this.alert=function(e,a,n,t){r(e,a,n,t)},this.confirm=function(e,a,t,i){var l=n.confirm({title:e,template:a});l.then(function(e){e?t(e):i?i(e):t(e)})},this.prompt=function(e,a,t,i,l){n.prompt({title:e,template:a,inputType:t,inputPlaceholder:i}).then(l)},this.isemail=/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/,this.isEmail=function(e){return i.isemail.test(e)},this.isusername=/^[a-z0-9_-]{4,16}$/,this.isUsername=function(e){return i.isusername.test(e)},this.ispassword=/^[-@.\/\!\$\%\^|#&,+\w\s]{6,50}$/,this.isPassword=function(e){return i.ispassword.test(e)},this.isnumber=/^-{0,1}\d*\.{0,1}\d+$/,this.isNumber=function(e){return i.isnumber.test(e)},this.istelephone=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,this.isTelephone=function(e){return i.istelephone.test(e)},this.matches=function(e,a){return e===a},this.num2month=function(e){return isNaN(e)?"Invalid Month":u[e]},this.unique=function(e){for(var a=new Array,n=e.length-1;n>=0;n--){for(var t=e.length-1;t>=0;t--)e[n]==e[t]&&n!=t&&delete e[t];void 0!=e[n]&&a.push(e[n])}return a.reverse()},this.count=function(e,a){var n=0;for(v in a)e===a[v]&&(n+=1);return n},this.str=function(e){return"object"===("undefined"==typeof e?"undefined":t(e))?JSON.stringify(e):e},this.json=function(e){return"object"===("undefined"==typeof e?"undefined":t(e))?e:JSON.parse(e)},this.md5=function(e){return/^[a-f0-9]{32}$/gm.test(e)?e:CryptoJS.MD5(e).toString()}}])}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(e,a,n){app.service("cgi",[function(){this.ajax=function(e){return $.ajax({method:"GET",url:"/php/index.php",data:e})}}])},{}],3:[function(e,a,n){e("./app.serv.js"),e("./cgi.serv.js")},{"./app.serv.js":1,"./cgi.serv.js":2}]},{},[3])},{}],6:[function(e,a,n){(function(a){function n(){var e=[];for(var a in this)this.hasOwnProperty(a)&&e.push(a);return e}a.app=e("./assets/js/app.js"),Object.defineProperty(Object.prototype,"keys",{value:n,enumerable:!1}),a.clone=function(e){return JSON.parse(JSON.stringify(e))},Array.prototype.has=function(e){return Array(this).join(",").indexOf(e)>-1},Array.prototype.count=function(e){if(void 0===e)return this.length;var a=0;return this.forEach(function(n,t){e==n&&a++}),a};var t=function(e){if(!e)return console.log("\nCannot run a forEach on an object where no callback is defined.\n".err),!1;for(var a in this)e(this[a],a)};Object.defineProperty(Object.prototype,"foreach",{value:t,enumerable:!1}),e("./assets/js/app-router.js"),e("./assets/js/services/services.js"),e("./assets/js/directives/directives.js"),e("./assets/js/controllers/controllers.js")}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./assets/js/app-router.js":1,"./assets/js/app.js":2,"./assets/js/controllers/controllers.js":3,"./assets/js/directives/directives.js":4,"./assets/js/services/services.js":5}]},{},[6]);