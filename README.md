# Frontend jumpstart

A set of files to get frontend development started very quickly

---

### Usage

1. Clone or download repository into your template folder (i.e. `site/templates`)
2. Navigate to `src` folder and run `npm install`
3. Use `grunt` to compile CSS and JavaScript files

There are two sets of pre-configured grunt tasks (which you can adjust to your liking):

1. `grunt` or `grunt default` — best used during development b/c it features a file watcher
2. `grunt prod` — for production ready code, best used before committing or pushing stuff to your production branch

The `src/assets/` folder gets synced to `build/assets/`, including files and folders. Here's usually a good place to store fonts, images and so on.