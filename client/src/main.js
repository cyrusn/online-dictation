import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bulma";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBookmark,
  faCheckSquare,
  faClock,
  faEdit,
  faFileAlt,
  faIdBadge
} from "@fortawesome/free-regular-svg-icons";

import {
  faBackward,
  faCheck,
  faPenAlt,
  faPlay,
  faShare,
  faSortNumericDown,
  faTimes,
  faUndo,
  faUser,
  faUsers
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faBackward,
  faBookmark,
  faCheck,
  faCheckSquare,
  faClock,
  faEdit,
  faFileAlt,
  faIdBadge,
  faPenAlt,
  faPlay,
  faShare,
  faSortNumericDown,
  faTimes,
  faUndo,
  faUser,
  faUsers
);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.component("font-awesome-icon", FontAwesomeIcon);
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
