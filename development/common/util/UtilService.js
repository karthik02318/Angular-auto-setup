define([], function () {
    'use strict';
    var UtilSerice = {
        getService: function ($wgHttp) {
            return function (api,params,callback) {
                $wgHttp.get(api,{params:params}).success(function (result) {
                    if (callback) callback(result);
                });
            }
        },
        postService: function ($wgHttp) {
            return function (path,data ,callback) {
                $wgHttp.post(path,data).success(function (result) {
                    if (callback) callback(result);
                });
            }
        },
        fileUploadService: function ($wgHttp) {
            return function (serviceUrl,data,uploadComplete,uploadFailed,uploadProgress,uploadCanceled) {
                var formDt = new FormData();
                angular.forEach(data,function(value, key){
                    formDt.append(key,value);
                },data);
                var emptyFn = function(){};
                if(!uploadComplete){uploadComplete=emptyFn;}
                if(!uploadFailed){uploadFailed=emptyFn;}
                if(!uploadProgress){uploadProgress=emptyFn;}
                if(!uploadCanceled){uploadCanceled=emptyFn;}
                $wgHttp.fileUpload(serviceUrl,formDt,uploadComplete,uploadFailed,uploadProgress,uploadCanceled);
            }
        },
    };
    return UtilSerice;
});