<template>
  <div class="rounded-2xl bg-gray-100 h-8 ml-4 px-4 leading-8 cursor-pointer">
    <img class="inline-block w-5" :src="getImgUrl(ButtonIcon)" />
    
    {{ ButtonName }}

  </div>
</template>

<script>
export default {
  name: 'CustomButton',
  props: [
    'ButtonName', 'ButtonIcon'
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