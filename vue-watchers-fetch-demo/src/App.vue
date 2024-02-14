<template>
  <div id="app">
    <GithubUserRepos></GithubUserRepos>
  </div>
</template>

<script>
import GithubUserRepos from "./components/GithubUserRepos.vue";

export default {
  name: "App",
  components: {
    GithubUserRepos,
  },
};
</script>
