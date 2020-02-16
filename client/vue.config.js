module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5050/",
        changeOrigin: true
      }
    }
  },
  publicPath: process.env.NODE_ENV === "production" ? "/edict/" : "/",
  outputDir: "../public"
};
