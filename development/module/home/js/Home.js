/**
 * Provides the base Widget Login
 *
 * @module home
 * @submodule posApp
 */
define(['LoadComponent'], function (LoadComponent) {
    'use strict';
    /**
     * Class to hmome module use define the collection of compononts in side the template
     *
     * @class Home
     * @constructor
     * @extends Clazz.LoadComponent
     * @module home
     */
    var Home=Clazz.extend(
    LoadComponent,{
        initialize:function(){
            this.templateUrl= Clazz.config.apps.home.templateUrl;
            /**
             * @restrict A
             *
             * @description
             * Using home module gets the collection of elements from template and loads the appropriate
             * components with the help of angular directives. This element is automatically loaded from
             * angular route.
             *
             *
             * ```html
             * <pos:home></pos:home>
             * ```
             *
             * @element posHome
             */
            this.myContainer="posHome";
            this.moduleName = Clazz.config.apps.home.moduleName;
            this.mymodule = angular.module(this.moduleName);
        }
    });
    return new Home();
});
