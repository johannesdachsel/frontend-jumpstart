module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
	pkg: grunt.file.readJSON("package.json"),
	
	// HTML includes
	includes: {
		files: {
			src: ["html/*.html"], 
			dest: 'build',
			flatten: true,
			cwd: '.',
			options: {
				silent: true,
				includePath: "html/inc",
				filenameSuffix: ".inc.html"
			}
		}
	},
	
	// SASS files
	sass: {
		dev: {
			options: {
	            sourcemap: "none",
	            style: "expanded"
	        },
			files: {
	            "build/css/main.css": "styles/main.scss"
	        }
		},
		prod: {
			options: {
	            sourcemap: "auto",
	            style: "compressed"
	        },
            files: {
	            "build/css/main.css": "styles/main.scss"
	        }
		}
    },
    
    autoprefixer:{
        styles: {
	        src: "build/css/main.css"
        }
    },
    
    // Concat script files
    concat: {
        scripts: {
	        src: [
	            "scripts/main.js"
	        ],
	        dest: "build/js/main.js",
	    }
    },
	
	// Uglify script files
	uglify: {
	    scripts: {
	        src: "build/js/main.js",
	        dest: "build/js/main.min.js"
	    }
	},	
	
	// Watch files
	watch: {
		html: {
			files: ["html/*.html", "html/inc/*.html"],
	        tasks: ["includes"],
	        options: {
	            spawn: false,
	        }
		},
		styles: {
			files: ["styles/*.scss"],
	        tasks: ["sass:dev", "autoprefixer"],
	        options: {
	            spawn: false,
	        }
		},
		scripts: {
			files: ["scripts/*.js"],
	        tasks: ["concat", "uglify"],
	        options: {
	            spawn: false,
	        }
		}
	}
});

// Load the tasks.
grunt.loadNpmTasks("grunt-includes");
grunt.loadNpmTasks("grunt-contrib-sass");
grunt.loadNpmTasks("grunt-autoprefixer");
grunt.loadNpmTasks("grunt-contrib-concat");
grunt.loadNpmTasks("grunt-contrib-uglify");
grunt.loadNpmTasks("grunt-contrib-watch");

// Default task(s).
grunt.registerTask("default", ["includes", "sass:dev", "autoprefixer", "concat", "uglify", "watch"]);
grunt.registerTask("prod", ["includes", "sass:prod", "autoprefixer", "concat", "uglify"]);
};