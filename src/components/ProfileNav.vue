<template>
  <div v-bind:class="{ 'w-60': !collapsed, 'w-12': collapsed }" class="border-l hscreen">
    <div @click="collapsed = !collapsed">open</div>
    <div class="h-6 border-b border-black">
    </div>
    <div class="h-9 w-9 m-1 bg-cover rounded-full" :style="'background-image: url('+ $auth.user.picture +')'"></div>
  </div>
</template>

<script>
export default {
  name: 'ProfileNav',
  computed: {
    avatarImg () { return this.$store.state.user.meta.picture }
  },
  data() {
    return {
      collapsed: true
    }
  }

}
</script>

<style>

</style>