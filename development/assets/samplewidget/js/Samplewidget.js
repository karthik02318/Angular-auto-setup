/**
* Provides the base Widget Samplewidget
*
* @module samplewidget
* @submodule posApp
*/
define(['Widget','samplewidgetControllers','samplewidgetDirectives','samplewidgetFactories','samplewidgetServices','samplewidgetFilters','samplewidgetConstants'], function (Widget,Controllers,Directives,Factories,Services,Filters,Constants) {
	'use strict';
    /**
    * Class to samplewidget module use to initialize all objects
    *
    * @class Samplewidget
    * @constructor initialize
    * @extends Clazz.Widget
    * @module samplewidget
    */
	var Samplewidget=Clazz.extend(
		Clazz.Widget,{
        /**
        * Initialize all objects
        * @method initialize
        * @private
        */
		initialize:function(){
			this.templateUrl= Clazz.config.assets.samplewidget.templateUrl;
            /**
            * @restrict E
            *
            * @description
            * Using samplewidget module you can create the angular html template from template folder
            * widget is the attribute is mandatory.
            * element helps to find the module and widget attribute finds the module component path
            * option attribute to pass data via element and can get in controller scope
            * ref check config.json
            *
            * The buggy way to write it:
            * ```html
            * <pos:samplewidget ></pos:samplewidget>
            * ```
            *
            * The correct way to write it:
            *
            * ```html
            * <pos:samplewidget option='{"popup":false}' widget="samplewidget"></pos:samplewidget>
            * ```
            *
            * or
            *
            * ```html
            * <pos:samplewidget option='{"popup":false}' widget="samplewidget"></pos:samplewidget>
            * ```
            *
            * @element posSamplewidget
            * @attribute widget Pass module name
            * @attribute option Pass stringify json
            * @required
            */
			this.myContainer="posSamplewidget";
			this.moduleName = Clazz.config.assets.samplewidget.moduleName; //'nav';
			this.mymodule = angular.module(this.moduleName);
			this.controllers = Controllers;
            this.directives = Directives;
            this.factories = Factories;
            this.services = Services;
            this.filters = Filters;
            this.constants = Constants;
		},
		/**
		 * To inject all angular dependencies to this module
		 * @method injectDependencies
		 * @private
		 */
		injectDependencies: function(data){

		}
	});
	return new Samplewidget();
});
