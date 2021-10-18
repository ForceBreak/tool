<template>
  <div>
    <Searchbar />
    <div class="results">
      <div v-if="loading" class="loading">Loading</div>

      <Video v-if="video" />

      <DynamicScroller
        :items="lines"
        :min-item-size="54"
        class="scroller"
        key-field="line_id"
        @scroll.native="onScroll"
      >
        <template v-slot="{ item, index, active }">
          <DynamicScrollerItem
            :item="item"
            :active="active"
            :data-index="index"
            key-field="line_id"
          >

          <SingleLine :id="item.video_id" :start="item.start" :linetext="item.line" />
          <!-- <div class="text" @click="openVideo(item.video_id, item.start)">{{ item.line }}</div> -->
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>

      <!-- {{lines}} -->
    </div>
  </div>
</template>

<script>
import Video from '@/components/search/Video'
import Searchbar from '@/components/search/Searchbar'
import SingleLine from '@/components/search/SingleLine'

export default {
  name: 'Search',
  components: {
    Video, Searchbar, SingleLine
  },
  data: () => {
    return {
      video: false
    }
  },
  props: {
    items: Array,
  },
  computed: {
    lines () { return this.$store.state.search.lines },
    loading () { return this.$store.state.search.loading }
  },
  methods: {
    async callSearch() {
      this.$store.dispatch('fetchLines')
    },
    onScroll(el) {
      this.video = false;

      if ( el.path[0].offsetHeight + el.path[0].scrollTop >= el.path[0].scrollHeight ) {
        // measure amount of searches?
        this.$store.dispatch('fetchLines', {
          followup: true
        })
      }
    }
  }
}
</script>

<style scoped>
.scroller {
  height: calc(100vh - 6rem);
}

.text {
  font-family: 'IBM Plex Mono';
  font-size: 1rem;
}
</style>