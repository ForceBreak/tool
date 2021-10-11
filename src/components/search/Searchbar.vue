<template>
  <div>
    <FormulateInput
      type="text"
      label="Fill in your search query"
      validation="required"
      validation-name="Search query"
      placeholder="e.g. Vaccines"
    />

    <FormulateInput
      type="checkbox"
      label="Pick community buckets"
      v-model="community_buckets"
      :options="{qanon: 'QAnon', disinfo: 'Disinformation', politics: 'Politics'}"
    />


    <div @click="callInitialSearch">

    Click here to search
  </div>
  </div>
</template>

<script>
export default {
  name: 'Searchbar',
  data () {
    return {
      community_buckets: {}

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

<style>

</style>