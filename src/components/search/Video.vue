<template>
  <vue-draggable-resizable
    class="planeWrap"
    ref="planeWrap"
    :w="480"
    :h="270"
    :x="dragMargin"
    :y="dragMargin"
    :lock-aspect-ratio="true"
    :parent="true"
  >
    <div ref="dragArea" class="dragArea"></div>
    <div ref="youtubeParent" class="w-100 h-100">
      <youtube 
        ref="youtube"
        class="yt" 
        id="widget2"
        width="100%" 
        height="100%" 
        frameborder="0" 
        sandbox="allow-scripts allow-same-origin" 
        :video-id="video_id" 
        :player-vars="playerVars"
      />
    </div>
  </vue-draggable-resizable>
</template>

<script>
export default {
  name: 'video',
  props: ['dragAreaWidth'],
  data(){
    return{
      playerVars: {
        cc_load_policy: 1,
        iv_load_policy: 3,
        controls: 0,
        playsinline: 1,
        rel: 0,
        modestbranding: 1,
        autoplay: 1,
        widgetid: 1,
        allowfullscreen: 1
      },
      playerState: false,
      dragMargin: 16
    }
  },
  methods: {
    async playPause(){
      this.playerState = !this.playerState

      if(this.playerState) await this.player.pauseVideo()
      else await this.player.playVideo()
    },
  },
  computed: {
    video_id () { return this.$store.state.search.pictureInPicture.activeVideo },
    timestamp () { return this.$store.state.search.pictureInPicture.timestamp },
    player() { return this.$refs.youtube.player }
  },
  watch:{
    video_id(){ 
      this.playerState = false 
    }
  },
  mounted() {
    this.$refs.youtubeParent.addEventListener('click', this.playPause, false);
    this.$refs.planeWrap.$el.click()
  },
  beforeDestroy(){
    this.$refs.youtubeParent.removeEventListener('click', this.playPause, false);
  }
}
</script>

<style lang="scss" scoped>
.planeWrap{
  position: absolute;
  background: #0d0d0d;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px #777;
  z-index: 1!important;
  width: 480px;
  height: 270px;
}

.dragArea{
  position: absolute;
  width: 100%;
  height: 30px;
  cursor: all-scroll;
  z-index: 2;
}
</style>

