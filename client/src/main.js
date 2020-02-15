import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bulma";

Vue.config.productionTip = false;

Vue.use("bulma");

Vue.directive("focus", {
  inserted: function(el) {
    el.focus();
  }
});

// create eventHub for emitting and listening event over distance components
Vue.prototype.$eventHub = new Vue();

new Vue({
  router,
  store,
  strict: true,
  render: h => h(App)
}).$mount("#app");
