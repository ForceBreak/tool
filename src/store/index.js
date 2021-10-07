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
    }
  },
  actions: {
    async fetchLines (context, payload) {
      const { data } = await axios.get(`${process.env.VUE_APP_API_DOMAIN}/search/and`, {
        // const { data } = await axios.get("https://y1yd1oyc37.execute-api.us-east-1.amazonaws.com/search/and", {
          headers: {
          Authorization: `Bearer ${payload.token}`    // send the access token through the 'Authorization' header
        }
      });

      console.log(JSON.parse(data));
      context.commit('setLines', JSON.parse(data));
    },
    activateVideo (context, payload) {
      context.commit('setVideo', payload)
    }
  },
  modules: {
  }
})
