<template>
  <div id="app" v-if="!$auth.loading">
    <div id="welcome" v-if="!$auth.isAuthenticated">
      <button @click="login">Log in</button>


    </div>
    <div v-if="$auth.isAuthenticated">
      <Onboarding v-if="showOnboarding" />

      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/search">Search</router-link> | 
        <router-link to="/discovery">Discover</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import Onboarding from '@/components/Onboarding';

export default {
  name: 'app',
  components: {
    Onboarding
  },
  computed: {
    showOnboarding () { return this.$store.state.user.onboarding }
  },
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
