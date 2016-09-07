/**
 * A utility that brokers HTTP requests...
 *
 * @class Clazz
 * @constructor
 */
var Clazz = {
	config: {"utilModule": "trUtil"},
	modules:[],
    /**
     * @method extend
     * @param superClass
     * @param extendedFunctions
     * @returns baseClass
     */
	extend : function(superClass, extendedFunctions) {
        var self = this;
        /**
         * @method baseClass
         * @param config
         * @private
         */
	   var baseClass = function(config) {
		     if(this.initialize !== undefined){
                if(config !== undefined){
                    this.initialize(config);
                }
                else {
                    this.initialize(self.config);
                }
            }
        };
        baseClass.prototype.superClass = {};
        if (superClass !== undefined) {
            /*get all property from super class and give it to this class*/
            for(var property in superClass.prototype) {
                /* copy original method to superClass keyword, exclude the superclass property
                 because it is specific to each class*/
                if(property !== "superClass") {
                    baseClass.prototype.superClass[property] = superClass.prototype[property];
                    baseClass.prototype[property] = superClass.prototype[property];
                }
            }
        }
        /* now apply its own function*/
        for(var property in extendedFunctions) {
            baseClass.prototype[property] = extendedFunctions[property];
        }
        return baseClass;
    },
    /**
     * Creates object with package name
     *
     * @method addPackage
     * @param base
     * @param currentPackageName
     */
    addPackage : function(base, currentPackageName) {
        if(base[currentPackageName] == null) {
            base[currentPackageName] = {};
        }
    },
    /***
     * Create the package split by .
     *
     * @method createPackage
     * @param packageName
     */
    createPackage : function(packageName) {
        var packageNameSplitted = packageName.split(".");
        var currentBase = this;
        for (var i=0;i<packageNameSplitted.length;i++) {
            var currentPackageName = packageNameSplitted[i];
            this.addPackage(currentBase, currentPackageName);
            currentBase = currentBase[currentPackageName];
        }
    }
};