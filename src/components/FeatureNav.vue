<template>
  <div id="header">
    <div class="logo">
      RadiTube
    </div>
    <router-link to="/">Home</router-link> |
    <router-link to="/search">Search</router-link> |
    <router-link to="/discovery">Discover</router-link>
  </div>
</template>

<script>
export default {
  'name': 'FeatureNav'
};
</script>

<style scoped>
#header {
  height: 3rem;
  background: black;
}

.logo {
  height: 3rem;
}

#header {

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>