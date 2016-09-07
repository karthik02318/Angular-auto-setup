/**
 * Provides the base Widget Login
 *
 * @module util
 * @submodule posApp
 */
define([], function () {
	'use strict';
	var UtilFactory = {
	

		/**
		 * Factory to support custom dynamic view of children widgets based on the sub-routings
		 *
		 * @class $trUtilFactory
		 * @constructor
		 * @module util
		 */
		$trUtilFactory: function () {
			var factory={};
			/**
			 * @method findWidgetByRoute
			 * @param routeName {string}
			 * @return {Object}
			 * @example
			 * { component: componentPath, tag: tagName }
			 */
			factory.findWidgetByRoute=function(routeName){
				var comp=Clazz.config.routeAssetMapping[routeName];
				if(comp===undefined||comp==='') return false;
				var tagName='<tr:'+ comp.module +'></tr:'+ comp.module+'>';
				return { 
						component: comp.componentPath, 
						 tag: tagName
					}
			}
			return factory;
		},
		/**
		 * Custom Application http factory  Used to validate pre-conditions if any before http request is made
		 *
		 * @class $trHttp
		 * @constructor
		 * @module util
		 */
		$trHttp: function($http){
			var httpFactory={};
            $http.defaults.transformResponse.push(function (data) {
                    return data;
            });
			/**
			 * To process data before sent to server
			 *
			 * @method preCheck
			 * @return {boolean}
			 * @private
			 */
			var preCheck=function(){
				//Todo , Cookie read,  Session ID validate, User Validate etc.

				return true;
			};
			/**
			 * To process data after receiving from server server
			 *
			 * @method postCheck
			 * @return {boolean}
			 * @private
			 */
			var postCheck=function(){
				//Todo

				return true;
			};
			/**
			 *
			 *
			 * @method config
			 * @return {object}
			 */
			httpFactory.config=function(options){
				if(preCheck()){
					return $http(options);
				}
				return null;
			};
			/**
			 *
			 *
			 * @method get
			 * @return {object}
			 */
			httpFactory.get=function(url,config){
				if(preCheck()){
					return $http.get(url,config);
				}
				return null;
			};
			/**
			 *
			 *
			 * @method post
			 * @return {object}
			 */
			httpFactory.post=function(url,config){
				if(preCheck()){
					return $http.post(url,config);
				}
				return null;
			};
			/**
			 *
			 *
			 * @method put
			 * @return {object}
			 */
			httpFactory.put=function(url,config){
				if(preCheck()){
					return $http.put(url,config);
				}
				return null;
			};
			/**
			 *
			 *
			 * @method delete
			 * @return {object}
			 */
			httpFactory.delete=function(url,config){
				if(preCheck()){
					return $http.delete(url,config);
				}
				return null;
			};
			/**
			 *
			 *
			 * @method fileUpload
			 * @return {object}
			 */
            httpFactory.fileUpload=function(url,form,uploadComplete,uploadFailed,uploadProgress,uploadCanceled){
                var xhr = new XMLHttpRequest();
                if(uploadProgress != undefined){
                    xhr.upload.addEventListener("progress", uploadProgress, false);
                }
                if(uploadComplete != undefined) {
                    xhr.addEventListener("load", uploadComplete, false);
                }
                if(uploadFailed != undefined) {
                    xhr.addEventListener("error", uploadFailed, false);
                }
                if(uploadCanceled != undefined) {
                    xhr.addEventListener("abort", uploadCanceled, false);
                }
                xhr.open("POST", url);
                xhr.send(form);
            };
			return httpFactory;
		},
		/**
		 * Sample model collection
		 *
		 * @class usersManager
		 * @constructor
		 * @module util
		 */
		usersManager:function($trHttp,$q,User){
			var usersManager = {
				_pool: {},
				_retrieveData: function(userId, userData) {
					var users = [];
					angular.forEach(this._pool, function(value, key) {
						users.push(value);
					}, this);
					return users;
				},
				_retrieveInstance: function(userId, userData) {
					var instance = this._pool[userId];

					if (instance) {
						instance.setData(userData);
					} else {
						instance = new User(userData);
						this._pool[userId] = instance;
					}

					return instance;
				},
				_search: function(userId) {
					return this._pool[userId];
				},
				_load: function(userId, deferred) {
					var scope = this;

					$trHttp.get(Clazz.config.api.users + userId)
						.success(function(userData) {
							var user = scope._retrieveInstance(userData.id, userData);
							deferred.resolve(user);
						})
						.error(function() {
							deferred.reject();
						});
				},
				/* Public Methods */
				/* Use this function in order to get a user instance by it's id */
				getUser: function(userId) {
					var deferred = $q.defer();
					var user = this._search(userId);
					if (user) {
						deferred.resolve(user);
					} else {
						this._load(userId, deferred);
					}
					return deferred.promise;
				},addUser: function(userData) {
					var deferred = $q.defer();
					var scope = this;
					var user = new User(userData);
					//var a= this.getUser(user.delete(userData));
					user.add(userData).then(function(data){
						scope._retrieveInstance(data.id, data);

						deferred.resolve(scope._retrieveData());
					});
					return deferred.promise;
				},
				updateUser: function(id,userData) {
					var deferred = $q.defer();
					var scope = this;
					var instance = new User(userData);
					//this._retrieveInstance(instance.update(userData))
					instance.update(userData).then(function(data){
						scope._retrieveInstance(data.id,data);
						deferred.resolve(scope._retrieveData());
					});
					return deferred.promise;
				},
				deleteUser: function(id,userData) {
					var deferred = $q.defer();
					var scope = this;
					var user = new User(userData);
					//var a= this.getUser(user.delete(userData));
					user.delete(userData).then(function(data){
						delete scope._pool[data];
						deferred.resolve(scope._retrieveData());
					});
					return deferred.promise;
				},
				/* Use this function in order to get instances of all the users */
				loadAllUsers: function() {
					var deferred = $q.defer();
					var scope = this;
					$trHttp.get(Clazz.config.api.users).success(function(usersArray) {
						var users = [];
						usersArray.forEach(function(userData) {
							var user = scope._retrieveInstance(userData.id, userData);
							users.push(user);
						});
						deferred.resolve(users);
					}).error(function() {
						deferred.reject();
					});
					return deferred.promise;
				},
				/*  This function is useful when we got somehow the user data and we wish to store it or update the pool and get a user instance in return */
				setUser: function(userData) {
					var scope = this;
					var user = this._search(userData.id);
					if (user) {
						user.setData(userData);
					} else {
						user = scope._retrieveInstance(userData);
					}
					return user;
				}
			};
			return usersManager;
		},
		/**
		 * Sample model
		 *
		 * @class User
		 * @constructor
		 * @module util
		 */
		User:function($trHttp,$q){
			function User(userData) {
				if (userData) {
					this.setData(userData);
				}
				// Some other initializations related to user
			};
			User.prototype = {
				/**
				 * To set the user data
				 *
				 * @method setData
				 * @param userData {object}
				 */
				setData: function(userData) {
					angular.extend(this, userData);
				},
				add: function() {
					var deferred = $q.defer();
					var scope = this;
					$trHttp.post(Clazz.config.api.users,this).success(function(user) {
						deferred.resolve(user);
					});
					return deferred.promise;
				},
				delete: function() {
					var deferred = $q.defer();
					var scope = this;
					$trHttp.delete(Clazz.config.api.users + this.id).success(function(user) {
						deferred.resolve(scope.id);
					});
					return deferred.promise;
				},
				update: function() {
					var deferred = $q.defer();
					$trHttp.put(Clazz.config.api.users + this.id, this).success(function(user) {
						deferred.resolve(user);
					});
					return deferred.promise;
				},
				isAvailable: function() {
					if (!this.user.stores || this.user.stores.length === 0) {
						return false;
					}
					return this.user.stores.some(function(store) {
						return store.quantity > 0;
					});
				}
			};
			return User;
		}
	};
	return UtilFactory;
});