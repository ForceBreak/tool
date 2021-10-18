<template>
  <div 
    class="h-16 leading-16 overflow-hidden border-b text-center static" 
    @mouseover="showOptions = true" 
    @mouseleave="showOptions = false">

    <span 
      class="w-full font-mono overflow-x-hidden text-base"
      @click="openVideo(id, start)">
    {{ linetext }}
    </span>

    <span 
      class="bg-white absolute bottom-4 right-4 top-4 px-2 leading-11 border rounded" 
      v-if="showOptions">
      <span class="details-img h-6 w-6 px-1 bg-no-repeat inline-block"></span>
      <span class="share-img h-6 w-6 px-1 bg-no-repeat inline-block"></span>
      <span class="favorite-img h-6 w-6 px-1 bg-no-repeat inline-block"></span>
    </span>

  </div>
</template>

<script>
export default {
  name: 'SingleLine',
  props: [
    'id', 'start', 'linetext'
  ],
  data() {
    return {
      showOptions: true
    }
  },
  methods: {
    openVideo(id, timestamp) {
      const payload = {
        video_id: id,
        timestamp: timestamp
      }

      this.$store.dispatch('activateVideo', payload)
        .then(() => {
          this.video = true
        });
    },
  }
}
</script>

<style>
.details-img {
  background-image: url('../../assets/icons/details.svg');
}
.share-img {
  background-image: url('../../assets/icons/share.svg');
}

.favorite-img {
  background-image: url('../../assets/icons/favorite.svg');
}

</style>