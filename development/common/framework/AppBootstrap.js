/**
 * Provides the base module
 * @module posApp
 */
var reqConfig = {
	baseUrl: "",
	paths: {
		angular: 'common/lib/angular/angular.min',
		angularRoute: 'common/lib/angular-route/angular-route.min',
		framework: 'common/framework',
		util: 'common/util',
		Widget: 'common/framework/Widget',
		LoadComponent: 'common/framework/LoadComponent',
		angularbootstrap:"common/lib/angular-bootstrap/ui-bootstrap.min",
		angularbootstraptpls:"common/lib/angular-bootstrap/ui-bootstrap-tpls.min",
		angularanimate:"common/lib/angular-animate/angular-animate.min"
	},"shim": {
		"angular": {"exports": "angular"},
		"angularRoute": ["angular"],
		"angularbootstrap":["angular"],
		"framework/Helper":["framework/Class"]
	},
	priority: ["angular"]
};

var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() {
	if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
		//self.configRequireJs(JSON.parse(xmlHttp.response),callback);
		var merge_options = function(obj1,obj2){
			var obj3 = {};
			for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
			for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
			return obj3;
		};
		var config = JSON.parse(xmlHttp.response)
		var tt = reqConfig.shim;
		reqConfig.shim = merge_options(tt,config.dependencies);
		require.config(reqConfig);
		require(['angular','angularRoute','framework/Class','framework/Base','framework/Helper'], function (angular,angularRoute,Class,Base,Helper) {
			'use strict';
			Helper.loadConfig(config, function(){
				angular.element(document).ready(function () {
					/* Setup Angular's Routeprovider */
					require(['framework/Routes'], function (Routes) {
						/* Bootstrap main Module - created by App.js file*/
						console.log("Lib loaded");
						require(['framework/LoadDefaultComponents','angularbootstrap','angularbootstraptpls','angularanimate'],function(LoadDefaultComponents){
							LoadDefaultComponents.initContainer();
							angular.bootstrap(document,[Clazz.config.mainModule]);
						});
					});
				});

			});
		});
	}
}
xmlHttp.open("GET", 'config.json', true); // true for asynchronous
xmlHttp.send(null);


