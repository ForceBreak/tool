<template>
  <div 
    class="h-16 leading-16 overflow-hidden border-b text-center static" 
    @mouseover="showOptions = true" 
    @mouseleave="showOptions = false">

    <div class="absolute left-4 top-4 bottom-4 leading-7 ">
      <span class="font-sans rounded bg-gray-200 px-2 py-1"> {{ channel_name }}</span>
      <span class="absolute offline-img h-6 w-6 inline-block mx-2"></span>
    </div>

    <span 
      class="w-full font-mono overflow-x-hidden text-base"
      @click="openVideo(id, start)">
    {{ linetext }}
    </span>

    <span 
      class="bg-white absolute bottom-4 right-4 top-4 px-2 leading-11 border rounded" 
      v-if="showOptions">
      <router-link :to="{ name: 'Buckets-Videos',  params: {id:id}}" target="_blank">
        <span class="details-img h-6 w-6 px-1 bg-no-repeat inline-block"></span>
      </router-link>
      <span class="share-img h-6 w-6 px-1 bg-no-repeat inline-block"></span>
      <span class="favorite-img h-6 w-6 px-1 bg-no-repeat inline-block"></span>
    </span>

  </div>
</template>

<script>
export default {
  name: 'SingleLine',
  props: [
    'id', 'start', 'linetext', 'channel_name', 'channel_id', 'bucket', 'date', 'online'
  ],
  data() {
    return {
      showOptions: false
    }
  },
  methods: {
    openVideo(id, timestamp) {
      const payload = {
        video_id: id,
        timestamp: timestamp,
        show: true
      }

      this.$store.dispatch('activateVideo', payload)
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

.offline-img {
  background-image: url('../../assets/icons/offline.svg')
}

</style>