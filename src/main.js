import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import { domain, clientId, audience, scope } from "../auth_config.json";
import { Auth0Plugin } from "./auth";

Vue.use(VueVirtualScroller)

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  scope,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')