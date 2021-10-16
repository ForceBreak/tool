<template>
  <div class="rounded-2xl bg-gray-100 h-8 ml-4 px-4 leading-8 cursor-pointer">
    <img v-if="ButtonIcon" class="inline-block w-5" :src="getImgUrl(ButtonIcon)" />
    <span class="font-mono text-sm rounded-sm bg-gray-50 px-1" v-if="!ButtonIcon">{{Selected}}</span>
    
    <span class="font-sans ml-2 text-sm">{{ ButtonName }}</span>

  </div>
</template>

<script>
export default {
  name: 'CustomButton',
  props: [
    'ButtonName', 'ButtonIcon', 'Selected'
  ],
  methods: {
    getImgUrl(icon) {
      return require('../assets/icons/' + icon + '.svg')
    }
  }

}
</script>

<style>

</style>