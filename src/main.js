import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/index.css'
import '@/assets/global.scss'

import VueFormulate from '@braid/vue-formulate'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import VueYoutube from 'vue-youtube'
import VueDraggableResizable from 'vue-draggable-resizable'

// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

import { domain, clientId, audience, scope } from "../auth_config.json";
import { Auth0Plugin } from "./auth";

Vue.use(VueFormulate)
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
Vue.use(VueYoutube)

Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')