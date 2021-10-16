<template>
  <div id="app" v-if="!$auth.loading">
    <div id="welcome" v-if="!$auth.isAuthenticated">
      <button @click="login">Log in</button>


    </div>
    <div v-if="$auth.isAuthenticated">
      <Onboarding v-if="showOnboarding" />

      <FeatureNav />

      <router-view />
    </div>
  </div>
</template>

<script>
import Onboarding from '@/components/Onboarding';
import FeatureNav from '@/components/FeatureNav';

export default {
  name: 'app',
  components: {
    FeatureNav, Onboarding
  },
  computed: {
    showOnboarding () { return this.$store.state.user.meta.onboarding_completed }
  },
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout();
      this.$router.push({ path: "/" });
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/fonts.scss';
@import '~@/styles/colors.scss';
@import '~normalize.css';
// @import '../node_modules/@braid/vue-formulate/themes/snow/snow.scss';

* {
  box-sizing: border-box;
  font-size: 16px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
