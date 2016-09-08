/**
 * Created by karthik.ar on 4/3/2015.
 * @param grunt
 */
'use strict';
var packagejson = require('./package.json');
module.exports = function (grunt) {
    var componentName = "",version_num=undefined;
    if(grunt.option('componentName') == undefined){
        componentName = "t";
    }else{
        componentName = grunt.option('componentName').toLowerCase();
    }

    if(grunt.option('versionnum') == undefined){
        version_num = undefined;
    }else{
        version_num = grunt.option('versionnum');
    }
    var capitalize=function(s)
    {
        if(s!==undefined){
            return s[0].toUpperCase() + s.slice(1);
        }

    };
    /*
     * To combine css files with the help of theme mapping Json
     */
   //var themeMapping = grunt.file.readJSON('development/theme/thememapping.json');
    var finalJson = {};

    grunt.initConfig({
        // Before generating any new files, remove any previously-created files.
        pkg: grunt.file.readJSON('package.json'),
        dir : {
            "development" : "development"
        },
        clean: {
            tests: ['rjs/build.json','built'],
            css:['development/theme/css/common/concat.css']
        },
        'string-replace': {
            build: {
                files: {
                    'template/json/config.hbs': 'template/json/config.hbs'
                },
                options: {
                    replacements: [
                        {
                            pattern: /"assets": {([\s\S]*?)/g,
                            replacement: '"assets": {\n        "{{name}}": {\n            "moduleName": "{{name}}",\n            "paths": {\n                "{{name}}": "assets/{{name}}/js/{{capitalize}}",\n                "{{name}}Controllers": "assets/{{name}}/js/{{capitalize}}Controllers",\n                "{{name}}Directives":"assets/{{name}}/js/{{capitalize}}Directives",\n                "{{name}}Factories":"assets/{{name}}/js/{{capitalize}}Factories",\n                "{{name}}Services":"assets/{{name}}/js/{{capitalize}}Services",\n             "{{name}}Filters":"assets/{{name}}/js/{{capitalize}}Filters",\n             "{{name}}Constants":"assets/{{name}}/js/{{capitalize}}Constants",\n             "{{name}}Listeners":"assets/{{name}}/js/{{capitalize}}Listeners",\n             "{{name}}Events":"assets/{{name}}/js/{{capitalize}}Events"\n             },\n            "templateUrl": "assets/{{name}}/template/{{capitalize}}.html"\n        },'
                        }
                    ]
                }
            },
            "version":{
                files: {
                    'development/config.json': 'development/config.json',
                    'bower.json':'bower.json'
                },options: {
                    replacements: [
                        {
                            pattern: /"version":.*",/g,
                            replacement: '"version":"'+packagejson.version+'",'
                        }
                    ]
                }
            }
        },
        // Configuration to be run (and then tested).
        writefile: {
            /*
            * Dynamicaly generate build json for requirejs config
            */
            json_value: {
                options: {
                    data: 'development/config.json'
                },
                src: 'rjs/value.hbs',
                dest: 'rjs/build.json'
            },
            /**/
            test_main_js:{
                options: {
                    data: 'development/config.json'
                },
                src: 'testdata/value.hbs',
                dest: 'test-main.js'
            },
            /*
             * Create components with the help of create command  $ grunt create --componentName=<module name>
             */
            insertjson:{
                options: {
                    data: {name:"",capitalize:""}
                },
                src: 'development/config.json',
                dest: 'template/json/config.hbs'
            },
            compjson:{
                options: {
                    data: {name:componentName,capitalize:capitalize(componentName),pref:packagejson.name.toLowerCase(),pref_c:capitalize(packagejson.name)}
                },
                src: 'template/json/config.hbs',
                dest: 'development/config.json'
            },
            create_comp:{
                options: {
                    data: {name:componentName,capitalize:capitalize(componentName),pref:packagejson.name.toLowerCase(),pref_c:capitalize(packagejson.name)}
                },
                src: 'template/component/js/Component.hbs',
                dest: 'development/assets/'+componentName+'/js/'+capitalize(componentName)+'.js'
            },
            crate_template:{
                options: {
                    data: {name:componentName,capitalize:capitalize(componentName),pref:packagejson.name.toLowerCase(),pref_c:capitalize(packagejson.name)}
                },
                src: 'template/component/template/Component.hbs',
                dest: 'development/assets/'+componentName+'/template/'+capitalize(componentName)+'.html'
            },
            crate_test:{
                options: {
                    data: {name:componentName,capitalize:capitalize(componentName),pref:packagejson.name.toLowerCase(),pref_c:capitalize(packagejson.name)}
                },
                src: 'template/component/test/Component.Test.hbs',
                dest: 'development/assets/'+componentName+'/test/'+capitalize(componentName)+'.Test.js'
            },
            crate_css:{
                options: {
                    data: {name:componentName,capitalize:capitalize(componentName),pref:packagejson.name.toLowerCase(),pref_c:capitalize(packagejson.name)}
                },
                src: 'template/component/css/Component.hbs',
                dest: 'development/assets/'+componentName+'/css/'+capitalize(componentName)+'.css'
            },
            create_controllers:{
                options: {
                    data: {name:componentName,capitalize:capitalize(componentName),pref:packagejson.name.toLowerCase(),pref_c:capitalize(packagejson.name)}
                },
                src: 'template/component/js/Controllers.hbs',
                dest: 'development/assets/'+componentName+'/js/'+capitalize(componentName)+'Controllers.js'
            },
            create_directives:{
                options: {
                    data: {name:componentName,capitalize:capitalize(componentName),pref:packagejson.name.toLowerCase(),pref_c:capitalize(packagejson.name)}
                },
                src: 'template/component/js/Directives.hbs',
                dest: 'development/assets/'+componentName+'/js/'+capitalize(componentName)+'Directives.js'
            },
            create_factories:{
                options: {
                    data: {name:componentName,capitalize:capitalize(componentName),pref:packagejson.name.toLowerCase(),pref_c:capitalize(packagejson.name)}
                },
                src: 'template/component/js/Factories.hbs',
                dest: 'development/assets/'+componentName+'/js/'+capitalize(componentName)+'Factories.js'
            },
            create_services:{
                options: {
                    data: {name:componentName,capitalize:capitalize(componentName),pref:packagejson.name.toLowerCase(),pref_c:capitalize(packagejson.name)}
                },
                src: 'template/component/js/Services.hbs',
                dest: 'development/assets/'+componentName+'/js/'+capitalize(componentName)+'Services.js'
            },
            create_filters:{
                options: {
                    data: {name:componentName,capitalize:capitalize(componentName),pref:packagejson.name.toLowerCase(),pref_c:capitalize(packagejson.name)}
                },
                src: 'template/component/js/Filters.hbs',
                dest: 'development/assets/'+componentName+'/js/'+capitalize(componentName)+'Filters.js'
            },
            create_constants:{
                options: {
                    data: {name:componentName,capitalize:capitalize(componentName),pref:packagejson.name.toLowerCase(),pref_c:capitalize(packagejson.name)}
                },
                src: 'template/component/js/Constants.hbs',
                dest: 'development/assets/'+componentName+'/js/'+capitalize(componentName)+'Constants.js'
            },
            create_events:{
                options: {
                    data: {name:componentName,capitalize:capitalize(componentName),pref:packagejson.name.toLowerCase(),pref_c:capitalize(packagejson.name)}
                },
                src: 'template/component/js/Events.hbs',
                dest: 'development/assets/'+componentName+'/js/'+capitalize(componentName)+'Events.js'
            },
            create_listeners:{
                options: {
                    data: {name:componentName,capitalize:capitalize(componentName),pref:packagejson.name.toLowerCase(),pref_c:capitalize(packagejson.name)}
                },
                src: 'template/component/js/Listeners.hbs',
                dest: 'development/assets/'+componentName+'/js/'+capitalize(componentName)+'Listeners.js'
            },
            cratemod_js:{
                options: {
                    data: {name:componentName,capitalize:capitalize(componentName),pref:packagejson.name.toLowerCase(),pref_c:capitalize(packagejson.name)}
                },
                src: 'template/component/modjs/Component.hbs',
                dest: 'development/module/'+componentName+'/js/'+capitalize(componentName)+'.js'
            },
            cratemod_template:{
                options: {
                    data: {name:componentName,capitalize:capitalize(componentName),pref:packagejson.name.toLowerCase(),pref_c:capitalize(packagejson.name)}
                },
                src: 'template/component/modtemplate/Component.hbs',
                dest: 'development/module/'+componentName+'/template/'+capitalize(componentName)+'.html'
            },
            create_routeJS:{
                options: {
                    data: {name:componentName,capitalize:capitalize(componentName),pref:packagejson.name.toLowerCase(),pref_c:capitalize(packagejson.name)}
                },
                src: 'template/route/js/Route.hbs',
                dest: 'development/module/'+componentName+'/js/'+capitalize(componentName)+'.js'
            },
            create_routeTmpl:{
                options: {
                    data: {name:componentName,capitalize:capitalize(componentName),pref:packagejson.name.toLowerCase(),pref_c:capitalize(packagejson.name)}
                },
                src: 'template/route/template/Route.hbs',
                dest: 'development/module/'+componentName+'/template/'+capitalize(componentName)+'.html'
            },
            initass:{
                options: {
                    data: {pref:packagejson.name.toLowerCase(),pref_c:capitalize(packagejson.name),pkg:packagejson},
                    preserveExtension: false
                },
                files: [{
                    expand: true,
                    cwd:'initialsetup/',
                    src: ['**/*.hbs'],
                    dest: 'development/'
                }]

            }
        },
        requirejs: {
            compile: {
                //options:grunt.file.readJSON('rjs/build.json')
            }
        },
        concat: {
            dist: {
                files: finalJson
            },
            css: {
                    src: ['development/theme/css/common/style.css','development/**/*.css','!development/theme/css/common/concat.css','!development/common/lib/**/*.css'],
                    dest: 'development/theme/css/common/concat.css'
                }
        },karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },watch: {
            scripts: {
                files: ['development/**/*.css','!development/theme/css/common/concat.css'],
                tasks: ['concatcss'],
                options: {
                    spawn: false
                },

            },
        },yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.appVersion %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: '<%= dir.development %>',
                    outdir: 'docs',
                    themedir: '',
                    extension: '.js',                                   // Default '.js' <comma-separated list of file extensions>
                    ignorePaths: ["development/common/lib"],
                    exclude:'common/lib'
                }
            }
        },
        mkdir: {
            createimgdir:{
                options: {
                    create: ['development/theme/images']
                }
            }
        }
    });

    // These plugins provide necessary tasks.

    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-writefile');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mkdir');





    // plugin's task(s), then test the result.
    //Register sub task to fix the dependency for the require
    grunt.registerTask('setRjsConfig', function() {
        grunt.config('requirejs.compile.options', grunt.file.readJSON('rjs/build.json'));
    });
   grunt.registerTask('default', ['clean:tests','concatcss', 'writefile:json_value','setRjsConfig','requirejs','string-replace:version']);
   grunt.registerTask('concatcss', ['clean:css','concat:css']);
   grunt.registerTask('test', ['karma']);
   //Create task
   grunt.registerTask('create', ['writefile:insertjson','string-replace:build','writefile:compjson:create_comp','writefile:create_comp','writefile:create_controllers','writefile:create_directives','writefile:create_factories','writefile:create_services','writefile:create_filters','writefile:create_constants','writefile:create_events','writefile:create_listeners','writefile:crate_template','writefile:crate_test','writefile:crate_css']);
   //not working
   grunt.registerTask('createmod', ['writefile:compjson:cratemod_js','writefile:cratemod_template']);
   grunt.registerTask('updateversion', ['string-replace:version']);
   grunt.registerTask('docs', ['yuidoc']);
   grunt.registerTask('start', ['writefile:initass','mkdir:createimgdir']);
};
