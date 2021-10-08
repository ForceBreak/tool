import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: "",
    user: {
      onboarding: true,
      meta: {}
    },
    search: {
      pictureInPicture: {
        activeVideo: "",
        timestamp: 0
      },
      loading: false,
      lines: []
    }
  },
  mutations: {
    setAuth (state, payload) {
      state.auth = payload;
    },
    setOnboarding (state, payload) {
      state.user.onboarding = payload;
    },
    storeMetadata (state, payload) {
      state.user.meta = payload;
    },
    setLines (state, payload) {
      payload.hits.hits.forEach((line) => {
        state.search.lines.push(line._source);
      })
    },
    setVideo (state, payload) {
      state.search.pictureInPicture.activeVideo = payload.video_id;
      state.search.pictureInPicture.timestamp = payload.timestamp;
    },
    setLoading (state, payload) {
      state.search.loading = payload;
    }
  },
  actions: {
    async authorizeAuth0 (context) {
      await this._vm.$auth.getTokenSilently()
      .then((res) => {
        context.commit('setAuth', res);
        console.log(res);
      })
    },
    async fetchLines (context) {
      context.commit('setLoading', true);
      await context.dispatch('authorizeAuth0');

      const { data } = await axios.get(`${process.env.VUE_APP_API_DOMAIN}/search/and`, {
          headers: {
          Authorization: `Bearer ${context.state.auth}`
        }
      });

      console.log(JSON.parse(data));
      context.commit('setLines', JSON.parse(data));
      context.commit('setLoading', false);
    },
    activateVideo (context, payload) {
      context.commit('setVideo', payload)
    },
    async storeUserMetadata (context) {
      await context.dispatch('authorizeAuth0');

      this._vm.$auth.getIdTokenClaims()
      .then((res) => {
        if (res['https://raditube.com/logins'] <= 1) { // or onboarding is done
          context.commit('setOnboarding', true)
        }

        context.commit('storeMetadata', res);
      })
    }
  },
  modules: {
  }
})
