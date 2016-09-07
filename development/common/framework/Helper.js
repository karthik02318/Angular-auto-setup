define([], function () {
'use strict';
Clazz.createPackage('com.base');
	/**
	 * Framework bootstrap helper class to form require js configuration
	 *
	 * @class Clazz.com.base.Helper
	 * @extends Clazz.Base
	 * @constructor
	 */
	Clazz.com.base.Helper = Clazz.extend(
		Clazz.Base,{
			/**
			 *
			 */
			initialize:function(){},

			/**
			 * Read application's specific config.json files and setup Require.js path
			 *
			 * @method loadConfig
			 * @param mainconfig config.json object
			 * @param callback Initial require call function
			 */
			loadConfig: function(mainconfig,callback){
				var self=this;
				self.configRequireJs(mainconfig,callback);
			},
			/**
			 *
			 *
			 * @method configRequireJs
			 * @param data config.json object
			 * @param callback Initial require call function
			 */
				configRequireJs: function(data,callback){
									var configJson = {paths: []};
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
										require.config(configJson);
										callback();
				}
	});
	return new Clazz.com.base.Helper();	
});