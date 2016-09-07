/**
* Provides the base Widget Samplewidget
*
* @module samplewidget
* @submodule posApp
*/
define([], function () {
    'use strict';
    var SamplewidgetServices = {
        /**
        * Provides Service to Samplewidget
        *
        * @class SamplewidgetServices
        * @constructor
        * @module samplewidget
        */
        samplewidgetService: function ($trHttp) {
            return function (path, callback) {
                $trHttp.get(path).success(function (data) {
                    if (callback) callback(data);
                });
            }
        }
    };
    return SamplewidgetServices;
});