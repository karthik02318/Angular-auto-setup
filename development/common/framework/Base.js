/**
 *
 *
 * @class Clazz.Base
 * @constructor
 * @extends {}
 * @module posApp
 */
define(["framework/Class"], function() {
    Clazz.Base = Clazz.extend(
        function() {},
        {   /****
			 * This is called during the object creation
             * @method initialize
			 * @param config Parameter for the constructor, typically a {} containing the
			 * necessary initialization parameters
			 */
            initialize : function(config) {
            }
        }
        );
    return Clazz.Base;
});