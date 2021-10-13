<template>
  <div id="searchbar">
    <FormulateInput
      type="text"
      label="Fill in your search query"
      validation="required"
      v-model="searchTerm"
      validation-name="Search query"
      placeholder="e.g. Vaccines"
    />

    <button @click="callInitialSearch">Search</button>

    <FormulateInput
      type="checkbox"
      label="Pick community buckets"
      v-model="community_buckets"
      :options="{qanon: 'QAnon', disinfo: 'Disinformation', politics: 'Politics'}"
    />


  </div>
</template>

<script>
export default {
  name: 'Searchbar',
  data () {
    return {
      searchTerm: "",
      community_buckets: {},

    }
  },
  methods: {
    async callInitialSearch() {
      this.$store.dispatch('fetchLines', {})
        // .then(() => this.loading = false)
    },
  }

}
</script>

<style lang="scss" scoped>
#searchbar {
  width: 100vw;
  height: 3rem;
  display: flex;
  border-bottom: 1px solid $border-line;
}
</style>