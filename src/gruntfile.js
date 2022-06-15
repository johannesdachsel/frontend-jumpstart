const sass = require('sass');

module.exports = function(grunt) {

// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		// ------------------------------------------------------  Compile SCSS
		sass: {
			dev: {
				options: {
					implementation: sass,
					style: "expanded"
				},
				files: {
					"../build/css/main.css": "styles/main.scss"
				}
			},
			prod: {
				options: {
					implementation: sass,
					style: "compressed"
				},
				files: {
					"../build/css/main.css": "styles/main.scss"
				}
			}
		},

		// ------------------------------------------------------  Concat script files
		concat: {
			scripts: {
				src: [
					"scripts/main.js"
				],
				dest: "../build/js/main.js",
			}
		},

		// Uglify script files
		uglify: {
			scripts: {
				src: "../build/js/main.js",
				dest: "../build/js/main.min.js"
			}
		},

		sync: {
			assets: {
				files: [
					{cwd: 'assets/', src: ["**"], dest: "../build/assets/"}
				],
				verbose: true,
				failOnError: true,
				updateAndDelete: true
			}
		},

		// Watch files
		watch: {
			styles: {
				files: ["styles/*.scss"],
				tasks: ["sass:dev"],
				options: {
					spawn: false
				}
			},
			scripts: {
				files: ["scripts/*.js"],
				tasks: ["concat", "uglify"],
				options: {
					spawn: false,
				}
			},
			assets: {
				files: ["assets/**"],
				tasks: ["sync"],
				options: {
					spawn: false
				}
			}
		}
	});

// Load the tasks.
	grunt.loadNpmTasks("grunt-sass");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-sync");
	grunt.loadNpmTasks("grunt-contrib-watch");

// Register task(s).
	grunt.registerTask("default", ["sass:dev", "concat", "uglify", "sync", "watch"]);
	grunt.registerTask("prod", ["sass:prod", "concat", "uglify", "sync"]);
};