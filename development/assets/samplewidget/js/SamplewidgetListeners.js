/**
* Provides the base Widget Samplewidget
*
* @module samplewidget
* @submodule posApp
*/
define([],function () {
    'use strict';
    /**
    * Provides Listener to Samplewidget
    *
    * @class SamplewidgetListener
    * @constructor
    * @module samplewidget
    */
    var SamplewidgetListener = {
        $myscope:null,
        initialize: function($scope,MY_EVENTS){
            this.listen($scope,MY_EVENTS);
        },

        listen: function($scope,MY_EVENTS){

        }
    }
    return SamplewidgetListener;
});
