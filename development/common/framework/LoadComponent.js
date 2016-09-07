define(['Widget'], function (Widget) {
    /**
     *
     *
     * @class Clazz.LoadComponent
     * @constructor
     * @extends Clazz.Widget
     * @module posApp
     */
    Clazz.LoadComponent = Clazz.extend(
        Widget, {
            initContainer:function(){
                var self = this;
                self.loadit();
            },
            loadWidgetByDirective:function(scope, element, attrs,$compile,$http,$timeout){
                require([attrs.widget], function (component) {
                    (function(wid,ele,scop,att){
                        wid.load();
                        //scop.widgetOption = att.option;
                        $http.get(wid.templateUrl,{cache:true})
                            .success(function(layout){
                                scop.widgetOption = att.option==undefined?{}:JSON.parse(att.option);
                                var linkFn = $compile(layout);
                                $timeout(function() {
                                    ele.append(linkFn(scop));
                                }, 1);
                            });
                    })(component,element,scope,attrs);
                });
            },
            loadit:function(){
                var self=this;
                if(self.myContainer===null||self.myContainer===undefined) return false;
                var contFn=function() {
                    return {
                        restrict: 'E',
                        templateUrl: self.templateUrl
                    };
                };
                if(self.mymodule.lazy!==undefined){
                    self.mymodule.lazy.directive(self.myContainer,contFn);
                }else{
                    self.mymodule.directive(self.myContainer,contFn);
                }
            }
        });

    return Clazz.LoadComponent;
});