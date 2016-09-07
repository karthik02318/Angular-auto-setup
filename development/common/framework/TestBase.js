define(['framework/Base'], function () {
	Clazz.TestBase = Clazz.extend(
		Clazz.Base, {
		controller:null,
		injector:null,
		$scope:null,
		initialize: function (angModule) {
			this.injector=angular.injector(['ng', angModule]);
			this.$scope = this.injector.get('$rootScope').$new();
			this.controller=this.injector.get('$controller');
		},
		getTestController: function(controllerName,paramJson){
			this.controller(controllerName, paramJson);
		},
		getTestService: function(serviceName,paramArr){
			var service=this.injector.get(serviceName);
			service.$inject=paramArr;
			return service;
		},
		getTestFactory: function(factoryName,paramArr){
			var factory=this.injector.get(factoryName);
			factory.$inject=paramArr;
			return factory;
		}
	});
	return Clazz.TestBase;
});