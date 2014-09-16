module.exports = function(grunt) {

  grunt.initConfig({

    requirejs: {
      compile: {
        options: {
          baseUrl: "../src",
          name: "../tools/almond",
          include: ["main"],

          out: "../dist/devanagariTextField.js",
          wrap: {
              "startFile": "wrap.start",
              "endFile": "wrap.end"
          },
          optimize: "none"
        }
      }
    },

    sass: {
      dist: {
        files: {
          'demo/css/main.css' : 'demo/css/sass/main.scss',
          'test.css': 'test.scss'
        }
      }
    },

		watch: {
      options:{
        livereload:true
      },
      sass:{
        files: '*.scss',
        tasks: ['sass']
      },
      requirejs: {
        files: 'src/*.js',
        tasks: ['requirejs']
      }
    },

    express:{
      all:{
        options:{
          port:9000,
          hostname: 'localhost',
          bases:['.'],
          livereload: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-express');

  grunt.registerTask('server', ['express', 'watch']);


};
