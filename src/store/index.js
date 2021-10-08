import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
    async fetchLines (context, payload) {
      context.commit('setLoading', true)
      const { data } = await axios.get(`${process.env.VUE_APP_API_DOMAIN}/search/and`, {
          headers: {
          Authorization: `Bearer ${payload.token}`    // send the access token through the 'Authorization' header
        }
      });

      console.log(JSON.parse(data));
      context.commit('setLines', JSON.parse(data));
      context.commit('setLoading', false);
    },
    activateVideo (context, payload) {
      context.commit('setVideo', payload)
    }
  },
  modules: {
  }
})
