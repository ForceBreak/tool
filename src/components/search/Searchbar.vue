<template>
  <div id="searchbar" class="h-12	w-full border-b">
    <div id="search" class="flex pr-4">
      <FormulateInput
        type="text"
        class="border-none"
        validation="required"
        v-model="searchTerm"
        validation-name="Search query"
        placeholder="e.g. Vaccines"
      />

      <button class="text-sm ml-4 my-2 px-4 font-semibold border border-purple-200 text-purple-600 rounded-2xl" @click="callInitialSearch">
        Search
      </button>
    </div>

    <div id="filters" class="border-l pr-4 py-2 flex">

        <custom-button
          ButtonName="Buckets"
          Selected=5
        />

      <custom-button
        ButtonName="Channels"
        ButtonIcon="channels"
      />

      <custom-button
        ButtonName="Dates"
        ButtonIcon="dates"
      />

      <custom-button
        ButtonName="Removed"
        ButtonIcon="removed"
      />

    <!-- <FormulateInput
      type="checkbox"
      label="Pick community buckets"
      v-model="community_buckets"
      :options="{qanon: 'QAnon', disinfo: 'Disinformation', politics: 'Politics'}"
    /> -->
    </div>

    <div id="sort" class="border-l pr-4 py-2">
      <custom-button
        ButtonName="Sort"
        ButtonIcon="sort"
      />

    </div>

    <div id="options" class="self-center justify-self-end ml-auto mr-4">
      Options
    </div>


  </div>
</template>

<script>
import CustomButton from '../CustomButton.vue'

export default {
  name: 'Searchbar',
  components: {
    CustomButton
  },
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

<style lang="scss">
#searchbar {
  display: flex;
}
</style>