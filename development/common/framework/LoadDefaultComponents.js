/**
 * Created by Karthik.ar on 9/2/2015.
 */
define(['LoadComponent'], function (LoadComponent) {
    /**
     *
     *
     * @class Clazz.LoadDefaultComponents
     * @constructor
     * @extends Clazz.LoadComponent
     * @module posApp
     */
    Clazz.LoadDefaultComponents = Clazz.extend(
        LoadComponent, {
            initContainer: function () {
                var self = this;
                var contFn = function ($compile, $http, $timeout) {
                    return {
                        restrict: 'A',
                        link: function (scope, element, attrs) {
                            self.loadWidgetByDirective(scope, element, attrs, $compile, $http, $timeout);
                        }
                    };
                };

                var contFnDestroy = function () {
                    return {
                        restrict: 'A',
                        link: function (scope, element, attrs) {
                            element.on('$destroy', function(){
                                scope.$destroy();
                            })
                        }
                    };
                };
                angular.module(Clazz.config.mainModule).directive("widget", ["$compile", "$http", "$timeout", contFn ]);
                angular.module(Clazz.config.mainModule).directive("widget", [ contFnDestroy ]);
            }
        });
    return new Clazz.LoadDefaultComponents();
});