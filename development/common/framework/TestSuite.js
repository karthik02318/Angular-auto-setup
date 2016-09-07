		var reqConfig = {
			baseUrl: "",
			paths: {
                jquery: 'common/lib/jquery-1.11.0.min',
                angular: 'common/lib/angular/angular',
                angularRoute: 'common/lib/angular/angular-route',
                framework: 'common/framework',
                util: 'common/util',
                Widget: 'common/framework/Widget',
                LoadComponent: 'common/framework/LoadComponent',
                TestBase: 'common/framework/TestBase'
			},shim: {
                'angular': {'exports': 'angular'},
                'util':{'exports':'angular'}
            },
			priority: ["angular"]
		};

		require.config(reqConfig);
		var testModules=[];
		require(['angular','framework/Class','framework/Base','framework/App','TestBase','jquery'], function () {
			'use strict';
			var configJson = {paths: []};
			jQuery.getJSON("config.json", function (data) {

                var appdata = data;
				var eachcall = 0;
				

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
			
			var successFunction = function(){
                angular.element(document).ready(function () {
                    /* Initialize app to create all modules*/
					var app=new Clazz.com.base.App();
					
					/*Load all test modules and trigger testing*/
					requirejs(testModules);
                });
            }
		});
	
	
	
	
	
	
	
	
	
	