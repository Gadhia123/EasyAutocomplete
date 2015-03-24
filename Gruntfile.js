module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    project: {
        app: '<%= pkg.name %>',

        js: {
          files: 'src/processResponseData.js, src/configuration.js, src/easy-autocomplete.js',
          src: 'src/*.js',
          dest: 'dist/jquery.easy-autocomplete.js',
          dist: 'dist/jquery.easy-autocomplete.min.js'
        },

        sass: {
          src: 'src/sass',
          dist: 'dist'
        }
    },
    
    tag: {
        banner: '/*\n' +
            ' * <%= pkg.name %>\n' +
            ' * <%= pkg.title %>\n' +
            ' * <%= pkg.url %>\n' +
            ' * @author <%= pkg.author %>\n' +
            ' * @version <%= pkg.version %>\n' +
            ' * Copyright <%= pkg.license.type %> License: <%= pkg.license.url %>\n' +
            ' */\n'
    },
    

    //------------------------ JAVASCRIPT --------------------------

    concat: {
      "src-js": {
        src: ['src/configuration.js', 'src/logger.js', 'src/constans.js', 'src/proccessData.js', 'src/core.js'],
        dest: '<%= project.js.dest %>',
      }
    },

    uglify: {
        dist: {
          files: {
            '<%= project.js.dist %>' : '<%= project.js.dest %>'
          }
        }
    },


    jshint: {
      all: [
            '<%= project.js.src %>',
            //'test/*.js',
            //'test/core/*.js'
      ],
      options: {
        jshintrc: true
      }
    },

    qunit: {
      all: [
            'test/*.html',
            'test/core/build.html',
            'test/core/event.html',
            'test/core/response.html'
          ]
    },
    
    //------------------------ CSS --------------------------

    sass: {
      dev: {
        options: {
          style: 'expanded',
          compass: false
        },
        files: [{
         expand: true,
         cwd: '<%= project.sass.src %>',
         src: ['*.scss'],
         dest: '<%= project.sass.dist %>',
         ext: '.css'
        }]
      },
      dist: {
        options: {
          style: 'compressed',
          compass: false
        },
        files: [{
         expand: true,
         cwd: '<%= project.sass.src %>',
         src: ['*.scss'],
         dest: '<%= project.sass.dist %>',
         ext: '.min.css'
        }]
      },
    },
    
    
    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['<%= project.sass.dist %>' + '/easy-autocomplete.min.css']
      },
      lax: {
        options: {
         import: false
        },
        src: ['<%= project.sass.dist %>' + '/easy-autocomplete.min.css']
      }
    },


    //------------------------ MISC --------------------------

    usebanner: {
      options: {
        position: 'top',
        banner: '<%= tag.banner %>'
      },
      files: {
        src: [
          '<%= project.sass.dist %>/*',
          '<%= project.js.dist %>'
        ]
      }
    },


    watch: {
      build: {
        files: 'src/{,*/}*.{scss,js}',
        tasks: ['build']
      }
    }
  });
  
  
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  grunt.registerTask('doc:jshint', ['jshint']);

  grunt.registerTask('doc:csslint', ['csslint:lax']);

  grunt.registerTask('doc', ['jshint', 'csslint:lax']);

  grunt.registerTask('test', ['qunit']);

  grunt.registerTask('build', ['concat', 'uglify', 'sass:dev', 'sass:dist', 'usebanner']);
  
  grunt.registerTask('default', ['build']);
};
