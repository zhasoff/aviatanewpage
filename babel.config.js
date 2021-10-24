module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "../assets/layouts/abstracts/_variables.scss";`
      }
    }
  }
}