<template>
  <div>
    <Searchbar />
    <div class="results">
      <div v-if="loading" class="loading">Loading</div>
      
      <div v-show="video" class="videoWrap" ref="videoWrap">
        <Video v-if="video" :dragAreaWidth="dragAreaWidth"/>
      </div>

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

          <SingleLine 
            v-if="item.line"
            :id="item.video_id" 
            :start="item.start" 
            :linetext="item.line" 
            :channel_name="item.channel_user"
            :channel_id="item.channel_id"
            :bucket="item.bucket"
            :date="item.date"
            :online="item.online"
          />

          <SingleLoad
            v-if="!item.line"
          />
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
import SingleLoad from '@/components/search/SingleLoad'

export default {
  name: 'Search',
  components: {
    Video, Searchbar, SingleLine, SingleLoad
  },
  data: () => {
    return {
      video: false,
      dragAreaWidth: 0,
      dragAreaFromTop: 0
    }
  },
  props: {
    items: Array,
  },
  computed: {
    showVideo () { return this.$store.state.search.pictureInPicture.show },
    lines () { return this.$store.state.search.lines },
    loading () { return this.$store.state.search.loading }
  },
  methods: {
    async callSearch() {
      this.$store.dispatch('fetchLines')
    },
    openVideo(id, timestamp) {
      const payload = {
        video_id: id,
        timestamp: timestamp
      }

      this.$store.dispatch('activateVideo', payload)
        .then(() => {
          this.video = true
          this.$refs.videoWrap.style.zIndex = 1
        });
    },
    onScroll(el) {
      this.$store.dispatch('activateVideo', {
        video_id: "",
        timestamp: "",
        show: false
      })

      if ( el.path[0].offsetHeight + el.path[0].scrollTop >= el.path[0].scrollHeight ) {
        // measure amount of searches?
        this.$store.dispatch('fetchLines', {
          followup: true
        })
      }
    },
    disableVideoWrap(){
      this.$refs.videoWrap.style.zIndex = 0
    }
  },
  mounted(){
    let dragArea = document.querySelector('.vue-recycle-scroller')
    this.dragAreaWidth = dragArea.clientWidth

    this.$refs.videoWrap.addEventListener('wheel', this.disableVideoWrap, false);
  },
  beforeDestroy(){
    this.$refs.videoWrap.removeEventListener('wheel', this.disableVideoWrap, false);
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