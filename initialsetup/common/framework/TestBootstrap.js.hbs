		var reqConfig = {
			baseUrl: "",
			paths: {
				jquery: 'common/lib/jquery-1.8.3.min',
				angular: 'common/lib/angular/angular',
				Class: 'common/framework/Class',
				Base: 'common/framework/Base',
				App: 'common/framework/App',
				Widget: 'common/framework/Widget',
				TestBase: 'common/framework/TestBase'
			},
			shim: {
				'angular': {'exports': 'angular'},
				'Base' : ['Class'],
				'App': ['Base']
			},
			priority: ["angular"]
		};
		require.config(reqConfig);
		var testModules=[];
		require(['angular','Class','Base','App','TestBase','jquery'], function (angular) {
			'use strict';
			var configJson = {paths: []};
			jQuery.getJSON("config.json", function (data) {
                var serverModules = data.modules;
				var eachcall = 0;
				
                angular.forEach(serverModules,function(moduleurl){
                    eachcall++;
                    jQuery.getJSON(moduleurl,function(appdata) {
                        eachcall--;
                        /* Apps */
                        angular.forEach(appdata.apps, function (value, key) {
                            data.apps[key] = value;
                        });
                        /* Assets */
                        angular.forEach(appdata.assets, function (value, key) {
                            data.assets[key] = value;
                        });
                        /* API */
                        angular.forEach(appdata.api, function (value, key) {
                            data.api[key] = value;
                        });
						/* RouteMapping */
						angular.forEach(appdata.routeMapping, function (value, key) {
                            data.routeMapping[key] = value;
                        });
						/* UnitTest */
						angular.forEach(appdata.unittest, function (value, key) {
                            data.unittest[key] = value;
                        });
                        Clazz.config = data;
                        /* Creating Assets */
                        angular.forEach(Clazz.config.assets, function (value, key) {
                            Clazz.modules.push(value.moduleName);
                            angular.forEach(value.paths, function(value,key){
                                configJson.paths[key] = value;
                            });
                        });
                        /* Creating Apps */
                        angular.forEach(Clazz.config.apps, function (value, key) {
                            Clazz.modules.push(value.moduleName);
                            angular.forEach(value.paths, function(value,key){
                                configJson.paths[key] = value;
                            });
                        });
						/* Load Test javascript file paths */
						angular.forEach(Clazz.config.unittest, function (value, key) {
							angular.forEach(value.paths, function(value,key){
								testModules.push(key);
								configJson.paths[key] = value;
							});
						});
                        require.config(configJson);
                        if(eachcall === 0){
                            successFunction();
                        }
                    });
                });
			});
			
			var successFunction = function(){
                angular.element(document).ready(function () {
                    /* Initialize app to create all modules*/
					var app=new Clazz.com.base.App();
					
					/*Load all test modules and trigger testing*/
					requirejs(testModules);
                });
            }
		});
	
	
	
	
	
	
	
	
	
	