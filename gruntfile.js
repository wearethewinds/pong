module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: "src/js",
                    mainConfigFile: 'requirejs.conf.js',
                    name: "index",
                    out: "dist/game.js"
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dist/style/styles.css': 'src/style/styles.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['requirejs', 'sass']);
};