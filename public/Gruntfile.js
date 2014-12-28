module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'build/app.js',
                dest: 'build/app.min.js'
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'src/scripts/**/*.js']
        },
        less: {
            dev: {
                options: {
                    paths: ['src/styles']
                },
                files: {
                    'build/app.css': ['src/styles/*.less']
                }
            }
        },
        concat: {
            options: {
                separator: '\n\n;'
            },
            dist: {
                src: ['src/scripts/**/*.js'],
                dest: 'build/app.js'
            }
        },
        watch: {
            files: [
                'src/scripts/**/*.js',
                'src/styles/**/*.less',
                'Gruntfile.js'
            ],
            tasks: ['default']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'concat', 'less']);

};