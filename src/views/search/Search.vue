<template>
  <div>
    <div @click="callSearch">
        call search
    </div>
    <div class="results">
      <div v-if="loading" class="loading">Loading</div>

      <Video v-if="video" />

      <DynamicScroller
        :items="lines"
        :min-item-size="54"
        class="scroller"
        key-field="line_id"
      >
        <template v-slot="{ item, index, active }">
          <DynamicScrollerItem
            :item="item"
            :active="active"
            :data-index="index"
            key-field="line_id"
          >

          <div class="text" @click="openVideo(item.video_id, item.start)">{{ item.line }}</div>
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>

      <!-- {{lines}} -->
    </div>
  </div>
</template>

<script>
import Video from '@/components/search/Video'

export default {
  name: 'Search',
  components: {
    Video
  },
  data: () => {
    return {
      loading: false,
      video: false
    }
  },
  props: {
    items: Array,
  },
  computed: {
    lines () {
      return this.$store.state.search.lines
    }
  },
  methods: {
    async callSearch() {
      this.loading = true;

      const payload = {
        token: await this.$auth.getTokenSilently()
      }

      this.$store.dispatch('fetchLines', payload)
        .then(() => this.loading = false)
    },
    openVideo(id, timestamp) {
      const payload = {
        video_id: id,
        timestamp: timestamp
      }

      this.$store.dispatch('activateVideo', payload)
        .then(() => this.video = true);
      // this.video = true;
    }
  }
}
</script>

<style scoped>
.scroller {
  height: 100vh;
}

.text {
  height: 50px;
}
</style>