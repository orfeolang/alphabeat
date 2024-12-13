<template>
  <header>
    <h1>
      <span class="alpha">Alpha</span>
      <span class="beat">Beat</span>
    </h1>
    <nav>
      <a href="#">Docs</a>
      <a href="http://orfeolang.com/">Orfeo</a>
      <a href="https://github.com/orfeolang/alphabeat"><span class="icon-github"></span></a>
      <a href="#"><span class="icon-discord"></span></a>
    </nav>
  </header>
</template>

<style scoped>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 20px;
  }

  h1, .icon-github, .icon-discord {
    font-size: 1.63rem; /* 26px */
  }

  .alpha {
    color: #c678dd;
  }

  .beat  {
    color: #e5c07b;
  }

  nav {
    display: flex;
    align-items: center;
  }

  a {
    margin-left: 20px;
  }
</style>
