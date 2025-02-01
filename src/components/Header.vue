<template>
  <header>
    <div class="logo">
      <RouterLink to="/">
        <h1>AlphaBeat</h1>
        <h2>A drum machine powered by Orfeo</h2>
      </RouterLink>
    </div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
      <RouterLink to="/sign-in">Sign-in</RouterLink>
      <RouterLink to="/sound-explorer">Sound-Explorer</RouterLink>
    <!--
      <a href="#">Sound-Explorer</a>
      <a href="#">Sound-Panel</a>
      <a href="#">Docs</a>
      <a href="http://orfeolang.com/">Orfeo</a>
      <a href="https://github.com/orfeolang/alphabeat"><span class="icon-github"></span></a>
      <a href="#"><span class="icon-discord"></span></a>
    -->
    </nav>
  </header>
</template>

<style scoped>
  header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
  }

  .logo {
    margin: 16px 0 0 30px;

    h1, .icon-github, .icon-discord {
      font-size: 1.63rem; /* 26px */
    }

    h2 {
      font-size: 1rem; /* 16px */
    }
  }

  nav {
    align-items: center;
    display: flex;
  }

  a {
    margin-left: 20px;
  }
</style>
