<template>
  <div id="header">
    <div class="logo">
      <img src="../assets/logo.svg" />
    </div>

    <header>
    <nav>
    <ul>
    <router-link to="/"><li class="leading-12 px-2">Dashboard</li></router-link>
    <router-link to="/buckets"><li class="leading-12 px-2">Buckets</li></router-link>
    <router-link to="/discovery"><li class="leading-12 px-2">Discovery</li></router-link>
    <router-link to="/search"><li class="leading-12 px-2">Search</li></router-link>
    <li class="leading-12 px-2"><router-link to="/track">Track</router-link></li>
    <li class="leading-12 px-2"><router-link to="/trends">Trends</router-link></li>
    </ul>
    </nav>
    </header>
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
      font-family: 'Ilisarniq';
      font-weight: 'normal';
      text-decoration: none;
    }
  }



#header {
  a {
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
      background: black;
    }
  }
}
</style>