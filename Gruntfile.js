module.exports = function( grunt ) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),
        // Documentation
        docco: {
            distr: {
                src: [ 'client/**/*.js', 'color/**/*.js', 'core/**/*.js', 'maths/**/*.js', 'node/**/*.js', 'redis/**/*.js', 'string/**/*/js' ],
                options: {
                    output: 'docs/'
                }
            }
        }
        // Build the JS files
        // concat: {
        //     options: {},
        //     distr: {
        //         src: [ 'src/remoxly.header.js', 'src/mixins.js', 'src/ui.js', 'src/utils.js', 'src/createClient.js', 'src/exports.js', 'src/remoxly.footer.js' ],
        //         dest: 'build/remoxly.js'
        //     }
        // }
        // Watch
        // watch: {
        //     scripts: {
        //         files: [ 'src/*', 'examples/*' ],
        //         tasks: [ 'develop' ],
        //         options: {
        //           spawn: false,
        //         }
        //     }
        // }
    });

    grunt.registerTask( 'develop', [ ] );
    grunt.registerTask( 'default', [ 'develop', 'docco' ] );

    grunt.loadNpmTasks( 'grunt-docco' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    // grunt.loadNpmTasks( 'grunt-contrib-watch' );

};