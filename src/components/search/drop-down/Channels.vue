<template>
  <div class="mt-1 z-40 absolute ml-4 px-8 py-4 base-bg rounded channelsWrap">
    <h2 class="text-black font-sans font-bold antialiased text-xl">
      Channels ({{ searchChannels.length }}/{{ channels.length }} selected) 
    </h2>
    <p class="mt-2 text-black text-sm">
      You can further narrow down your search by specifiying specific channels within your selected buckets
    </p>
    <div class="flex justify-between items-center mt-6 mb-5">
      <input 
        type="text" 
        v-model="searchText" 
        placeholder="Username" 
        class="flex-grow font-mono text-xs font-medium outline-none bg-transparent border-b base-border-color pl-4 pb-1"
        @input="filterChannels"
      >
      <button 
        class="font-mono text-xs text-black font-medium base-bg-darker rounded-2xl py-1.5 px-3.5 ml-7"
        @click="$store.commit('removeSelectedChannels')"
      >
        Deselect all
      </button>
    </div>
    <div class="flex flex-wrap justify-between overflow-auto max-h-80">
      <div
        v-for="channel in channels" 
        :key="channel.channel_id"
        class="flex w-60 mb-4 border rounded base-border-color py-2 pr-2 cursor-pointer"
        @click="selectChannel(channel.channel_id)"
        :class="{ 'bg-white':  searchChannels.indexOf(channel.channel_id) != -1}"
      >
        <div class="w-1/4 flex items-center">
          <img src="/images/channel-item.svg" alt="">
        </div>
        <div class="w-3/4">
          <p class="text-sm text-black font-medium"> {{ channel.channel_name }} </p>
          <p class="text-xs base-font-gray mt-2"> {{ channel.subscribers }} subscribers</p>
          <p class="text-super-xs base-font-gray-lighter mt-1"> {{ channel.channel_id }} </p>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Channels',
  data(){
    return{
      searchText: '',
      channels: [],
      baseChannelsList: []
    }
  },
  methods: {
    selectChannel(id){
      this.$store.commit('setChannels', id)
    },
    filterChannels(event){
      if(event.target.value.length) this.channels = this.baseChannelsList.filter(elem => elem.channel_name.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1)
      else this.channels = JSON.parse(JSON.stringify(this.baseChannelsList))
      console.log(event)
    },
    setBaseChannels(){
      this.baseChannelsList = JSON.parse(JSON.stringify(this.channels))
    }
  },
  computed:{
    searchChannels(){
      return this.$store.getters.searchChannels
    }
  },
  async mounted(){
    await axios.get('/dummy-data/channels.json').then(res => this.channels = res.data)
    this.setBaseChannels()
  }
};
</script>

<style scoped lang="scss">
.channelsWrap{
  max-width: 574px;
}
</style>