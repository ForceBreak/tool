<template>
  <div id="header">
    <div class="logo">
      <img src="../assets/logo.svg" />
    </div>

    <ul>
    <router-link to="/"><li>Dashboard</li></router-link>
    <li><router-link to="/discovery">Discovery</router-link></li>
    <li><router-link to="/search">Search</router-link></li>
    <li><router-link to="/">Track</router-link></li>
    <li><router-link to="/">Trends</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  'name': 'FeatureNav'
};
</script>

<style scoped lang="scss">
#header {
  height: 3rem;
  border-bottom: 1px solid black;
  display: flex;
}

  .logo {
    line-height: 3rem;
    width: 6rem;
    padding: 0 1rem;
    border-right: 1px solid black;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      display: inline-block;
      line-height: 3rem;
      font-family: 'Ilisarniq';
      font-weight: 'normal';
      text-decoration: none;
    }
  }



#header {

  a {
    color: #2c3e50;
    text-decoration: none;
    margin: 0 1rem;
          height: 3rem;
      display: inline-block;

    &.router-link-exact-active {
      color: #42b983;
      background: black;
    }
  }
}
</style>