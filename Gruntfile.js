module.exports = function( grunt ) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),
        // Documentation
        docco: {
            interpolations: {
                src: [ 'maths/interpolations/*.js' ],
                 options: {
                     output: 'docs/math/interpolations/'
                 }
            }
        },
        concat : {
            interpolations : {
                src : [ 'maths/interpolations/_.header.js', 'maths/interpolations/*.js', '!maths/interpolations/_.footer.js', 'maths/interpolations/_.footer.js' ],
                dest : 'build/W.math.interpolations.js'
            }
        }
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

    grunt.registerTask( 'default', [ 'concat' ] );

    grunt.loadNpmTasks( 'grunt-docco' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    // grunt.loadNpmTasks( 'grunt-contrib-watch' );

};