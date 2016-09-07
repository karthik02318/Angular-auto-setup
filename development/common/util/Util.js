/**
 * Act as a Common Util Module
 * feed as a Dependency Module for all application modules.
 *
 * @module util
 * @submodule posApp
 */
define(['Widget', 'util/UtilFactory','util/UtilFilter','util/UtilConstants','util/UtilService','util/UtilDirectives'], function (Widget, Factories ,Filters,Constants,Service,Directives) {
	'use strict';
	Clazz.createPackage('com.tr.util.js');
	/**
	 * Utility Class
	 *
	 * @class Clazz.com.tr.util.js.Util
	 * @constructor
	 * @extends Clazz.Widget
	 * @module util
	 */
	Clazz.com.tr.util.js.Util = Clazz.extend(
		Clazz.Widget, {
		/**
		 * Constructor of the widget
		 * @method initialize
		 */
		initialize: function () {
			this.moduleName = Clazz.config.utilModule;
			this.mymodule = angular.module(this.moduleName,[]);
			this.factories= Factories;
            this.filters = Filters;
            this.constants = Constants;
            this.services = Service;
            this.directives = Directives;
		},
		injectDependencies: function () {
			this.factories.$trHttp.$inject=['$http'];
			this.factories.usersManager.$inject=['$trHttp','$q','User'];
			this.factories.User.$inject=['$trHttp','$q'];
        }

	});
	return new Clazz.com.tr.util.js.Util();
});