/**
* Provides the base Widget Samplewidget
*
* @module samplewidget
* @submodule posApp
*/
define([],function () {
    'use strict';
    /**
    * Provides events to Samplewidget
    *
    * @class SamplewidgetEvents
    * @constructor
    * @module samplewidget
    */
    var SamplewidgetEvents = {
        rootScope:null,
        initialize: function($rootScope){
            this.rootScope = $rootScope;
        },
        samplewidgetCreated: function(data){
        }
    }
    return SamplewidgetEvents;
});
