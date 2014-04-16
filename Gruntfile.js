var FileListBuilder = require( './util/file-list-builder.js' );

module.exports = function( grunt ) {
    // # Package Lists
    var client = ( new FileListBuilder() )
        .push( 'core/' ).pop()
        .push( 'math/' )
            .push( 'math/interpolations/' ).pop()
        .pop()
        .push( 'color/' ).pop()
        .push( 'string/' ).pop()
        .push( 'client/' ).pop();

    var node = ( new FileListBuilder() )
        .addFile( '_.header.js' )
        .push( 'core/' ).pop()
        .push( 'math/' )
            .push( 'math/interpolations/' ).pop()
        .pop() 
        .push( 'color/' ).pop()
        .push( 'string/' ).pop()
        .addFile( 'node/_.export.js' )
        .addFile( 'redis/_.export.js' )
        .push( 'client/' ).pop();

    // # Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),
        // ## Documentation
        docco: {
            'math-interpolations': {
                src: [ 'math/interpolations/*.js' ],
                 options: {
                     output: 'docs/math/interpolations/'
                 }
            },
            'math' : {
                src: [ 'math/*.js' ],
                 options: {
                     output: 'docs/math/'
                 }
            },
            'core' : {
                src: [ 'core/*.js' ],
                 options: {
                     output: 'docs/core/'
                 }
            },
            'color' : {
                src: [ 'color/*.js' ],
                 options: {
                     output: 'docs/color/'
                 }
            },
            'client' : {
                src: [ 'client/*.js' ],
                 options: {
                     output: 'docs/client/'
                 }
            },
            'node' : {
                src: [ 'node/*.js' ],
                 options: {
                     output: 'docs/node/'
                 }
            },
            'redis' : {
                src: [ 'redis/*.js' ],
                 options: {
                     output: 'docs/redis/'
                 }
            },
            'string' : {
                src: [ 'string/*.js' ],
                 options: {
                     output: 'docs/string/'
                 }
            },

        },
        // ## Concat
        concat : {
            'client' : {
                src : client.files,
                dest : 'build/W.js'
            },
            'node' : {
                src : node.files,
                dest : 'build/W.node.js'
            }
        },
        // ## Ugilfy
        uglify: {
            options: {
                mangle: false
            },
            'client': {
                files: {
                    'build/W.min.js' : [ 'build/W.js' ]
                }
            }
        },
        // ## Tests – Node
        mochaTest : {
            'node': {
                options: {
                    // reporter: 'spec'
                },
                src : [ 'tests/**/*.test.js', 'tests/**/*.test.node.js' ]
            }
        }, 
        // ## Tests – Client Side (Phantom.js)
        mocha : {
            'client' : {
                src : [ 'tests/html/test.html' ],
                options : {
                    log : true,
                    logErrors : true,
                    run: true
                }
            }
        }
    });
    
    // # Task Names
    grunt.registerTask( 'test-client', [ 'mocha' ] );
    grunt.registerTask( 'test-node', [ 'mochaTest' ] );
    grunt.registerTask( 'docs', [ 'docco' ] );
    grunt.registerTask( 'build', [ 'concat' ] );
    grunt.registerTask( 'minify', [ 'uglify' ] );
    grunt.registerTask( 'all', [ 'build', 'test-node', 'test-client', 'docs' ] );

    // # Default Grunt
    grunt.registerTask( 'default', [ 'build', 'minify', 'test-node', 'test-client' ] );

    // # Load Tasks
    grunt.loadNpmTasks( 'grunt-docco' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-mocha-test' );
    grunt.loadNpmTasks( 'grunt-mocha' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-bump' ); // bump:minor
};