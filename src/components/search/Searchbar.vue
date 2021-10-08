<template>
  <div @click="callInitialSearch">
    Click here to search
  </div>
</template>

<script>
export default {
  name: 'Searchbar',
  methods: {
    async callInitialSearch() {
      const payload = {
        token: await this.$auth.getTokenSilently()
      }

      this.$store.dispatch('fetchLines', payload)
        // .then(() => this.loading = false)
    },
  }

}
</script>

<style>

</style>