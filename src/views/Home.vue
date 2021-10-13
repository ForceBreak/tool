<template>
  <div class="home">

    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <!-- show logout when authenticated -->
      <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
      <div v-if="$auth.isAuthenticated" @click="metadata">
        
        {{$auth.user}}
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => {
    return {
      token: ""
    }
  },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    metadata() {
      this.$auth.getIdTokenClaims()
      .then((res) => {
        console.log('claims');
        console.log(res)
      })
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
}
</script>
