define(["framework/Base"], function (Base) {
	/**
	 *
	 *
	 * @class Clazz.Widget
	 * @constructor initialize
	 * @module posApp
	 * @extends Clazz.Base
	 */
	Clazz.Widget = Clazz.extend(
		Clazz.Base, {
		/**
		 * To specify module name
		 * @property moduleName
		 * @type String
		 * @default null
		 * @required
		 */
		moduleName: null,
		/**
		 * module object
		 * @property mymodule
		 * @type angular.Module
		 * @default null
		 * @required
		 */
		mymodule: null,
		/**
		 *
		 * @property controllers
		 * @type object
		 * @default null
		 * @required
		 */
		controllers: null,
		/**
		 *
		 * @property services
		 * @type object
		 * @default null
		 * @optional
		 */
		services: null,
		/**
		 *
		 * @property factories
		 * @type object
		 * @default null
		 * @optional
		 */
		factories: null,
		/**
		 *
		 * @property directives
		 * @type object
		 * @default null
		 * @optional
		 */
		directives: null,
		/**
		 *
		 * @property myContainer
		 * @type String
		 * @default null
		 * @required
		 */
		myContainer: null,
		/**
		 *
		 * @property templateUrl
		 * @type String
		 * @default null
		 * @required
		 */
		templateUrl: null,
		/**
		 *
		 * @property constants
		 * @type object
		 * @default null
		 * @optional
		 */
        constants:null,
		/**
		 *
		 * @property decorators
		 * @type object
		 * @default null
		 * @optional
		 */
        decorators:null,
		/**
		 *
		 * @property events
		 * @type object
		 * @default null
		 * @optional
		 */
        events:null,
		/**
		 *
		 * @property listeners
		 * @type object
		 * @default null
		 * @optional
		 */
        listeners:null,
		initialize: function () {},
		load: function () {
			this.register();
			this.injectDependencies();
			this.initContainer();
			this.loadComponent();
		},
		initContainer: function(){

		},
		/**
		 * To register all objects to the module
		 *
		 * @method register
		 * @private
		 */
		register: function () {
			/*Registering controllers*/
			if (typeof (this.controllers) !== undefined && this.controllers !== null) {
				angular.forEach(this.controllers, function (value, key) {
					if(this.mymodule.lazy!==undefined){
						this.mymodule.lazy.controller(key, value);
					}else{
						this.mymodule.controller(key, value);
					}					
				}, this);
			}
			/*Registering Services*/
			if (typeof (this.services) !== undefined && this.services !== null) {
				angular.forEach(this.services, function (value, key) {
					if(this.mymodule.lazy!==undefined){
						this.mymodule.lazy.service(key, value);
					}else{
						this.mymodule.service(key, value);
					}	
				}, this);
			}
			/*Registering Factory*/
			if (typeof (this.factories) !== undefined && this.factories !== null) {
				angular.forEach(this.factories, function (value, key) {
					if(this.mymodule.lazy!==undefined){
						this.mymodule.lazy.factory(key, value);
					}else{
						this.mymodule.factory(key, value);
					}	
				}, this);
			}
			/*Registering filters*/
			if (typeof (this.filters) !== undefined && this.filters !== null) {
				angular.forEach(this.filters, function (value, key) {
					if(this.mymodule.lazy!==undefined){
						this.mymodule.lazy.filter(key, value);
					}else{
						this.mymodule.filter(key, value);
					}	
				}, this);
			}
			/*Registering directives*/
			if (typeof (this.directives) !== undefined && this.directives !== null) {
				angular.forEach(this.directives, function (value, key) {
					if(this.mymodule.lazy!==undefined){
						this.mymodule.lazy.directive(key, value);
					}else{
						this.mymodule.directive(key, value);
					}	
				}, this);
			}
            /*Registering constants*/
            if (typeof (this.constants) !== undefined && this.constants !== null) {
                angular.forEach(this.constants, function (value, key) {
                    if(this.mymodule.lazy!==undefined){
                        this.mymodule.lazy.constant(key, value);
                    }else{
                        this.mymodule.constant(key, value);
                    }
                }, this);
            }
            /*Registering decorators*/
            if (typeof (this.decorators) !== undefined && this.decorators !== null) {
                angular.forEach(this.decorators, function (value, key) {
                    if(this.mymodule.lazy!==undefined){
                        this.mymodule.lazy.decorator(key, value);
                    }else{
                        this.mymodule.decorator(key, value);
                    }
                }, this);
            }
            /*Registering Events*/
            if (typeof (this.events) !== undefined && this.events !== null) {
                this.events.initialize();
            }
            /*Registering Listeners*/
            if (typeof (this.listeners) !== undefined && this.listeners !== null) {
                this.listeners.initialize();
            }
		},
		injectDependencies: function(){},
        loadComponent:function(){}
	});

	return Clazz.Widget;
});