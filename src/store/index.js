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
      searchState: {
        term: "trump",
        online: true,
        buckets: ['qanon'],
        from: 0,
        size: 20
      },
      pictureInPicture: {
        activeVideo: "",
        timestamp: 0
      },
      loading: false,
      lines: []
    }
  },
  mutations: {
    loadMoreResults(state) {
      state.search.searchState.from = state.search.searchState.from + state.search.searchState.size;
    },
    setAuth(state, payload) {
      state.auth = payload;
    },
    setOnboarding(state, payload) {
      state.user.onboarding = payload;
    },
    storeMetadata(state, payload) {
      state.user.meta = payload;
    },
    setLines(state, payload) {
      payload.hits.hits.forEach((line) => {
        state.search.lines.push(line._source);
      })
    },
    setVideo(state, payload) {
      state.search.pictureInPicture.activeVideo = payload.video_id;
      state.search.pictureInPicture.timestamp = payload.timestamp;
    },
    setLoading(state, payload) {
      state.search.loading = payload;
    }
  },
  actions: {
    async authorizeAuth0(context) {
      await this._vm.$auth.getTokenSilently()
        .then((res) => {
          context.commit('setAuth', res);
          console.log(res);
        })
    },
    async fetchLines(context, payload) {
      if (payload.followup) {
        context.commit('loadMoreResults')
      }

      context.commit('setLoading', true);
      await context.dispatch('authorizeAuth0');

      const { data } = await axios.post(`${process.env.VUE_APP_API_DOMAIN}/search`, 
        {
          term: context.state.search.searchState.term,
          from: context.state.search.searchState.from,
          size: context.state.search.searchState.size,
          online: context.state.search.searchState.online, 
          specific_channel: "",
          sort: "date",
          sort_order: "asc",
          date_gte: "",
          date_lte: "",
          offline_reason: "",
          buckets: context.state.search.searchState.buckets
        },
        {
          headers: {
            Authorization: `Bearer ${context.state.auth}`
          }
        });

      context.commit('setLines', JSON.parse(data));
      context.commit('setLoading', false);
    },
    activateVideo(context, payload) {
      context.commit('setVideo', payload)
    },
    track(context, payload) {
      const email = context.state.user.meta.email;
      axios.get(`${process.env.VUE_APP_API_DOMAIN}/trackpage/${btoa(payload.name)}/e/${btoa(email)}`);
    },
    async storeUserMetadata(context) {
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
