<script>
import GithubService from "../services/GithubService";

export default {
  data() {
    return {
      username: "",
      repos: [],
      selectedRepo: "",
    };
  },
  methods: {
    async fetchRepos() {
      console.log("fetchRepos");
      this.repos = await GithubService.getUserRepos(this.username);
    },
  },
};
</script>

<template>
  <div>
    <input
      v-model="username"
      @keyup.enter="fetchRepos"
      placeholder="GitHub Username"
    />
    <button @click="fetchRepos">Get Repos</button>
    <div v-if="repos.length > 0">
      <h3>Repositories</h3>
      <ul>
        <li v-for="repo in repos" :key="repo.id">
          {{ repo.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
