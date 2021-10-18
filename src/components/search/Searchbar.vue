<template>
  <div id="searchbar" class="h-12	w-full border-b">
    <div id="modal-bg" v-if="overlay" @click="closeModals" class="fixed top-0 z-20 w-screen	h-screen bg-black	bg-opacity-25"></div>

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

      <div>
        <custom-button
          ButtonName="Channels"
          ButtonIcon="channels"
          @click.native="modals.channels = !modals.channels"
        />
          <Channels v-if="modals.channels" />
      </div>

      <div>
        <custom-button
          ButtonName="Dates"
          ButtonIcon="dates"
        />
      </div>

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
import Channels from './drop-down/Channels.vue'

export default {
  name: 'Searchbar',
  components: {
    CustomButton, Channels
  },
  watch: {
    'modals': {
       handler: function () {
         if (this._data.modals.channels) {
           this._data.overlay = true;
         }

        // console.log(newer)
      },
      deep: true
    }
  },
  data () {
    return {
      searchTerm: "",
      community_buckets: {},
      overlay: false,
      modals: {
        buckets: false,
        channels: false,
        dates: false,
        removed: false,
        sort: false,
        export: false
      }

    }
  },
  methods: {
    async callInitialSearch() {
      this.$store.dispatch('fetchLines', {})
        // .then(() => this.loading = false)
    },
    closeModals() {
      this.overlay = false;
      Object.keys(this.modals).forEach(v => this.modals[v] = false)

      // loop over all
    }
  }

}
</script>

<style lang="scss">
#searchbar {
  display: flex;
}
</style>