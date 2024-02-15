<script>
import GithubService from "../services/GithubService";

export default {
  data() {
    return {
      username: "",
      repos: [],
      selectedRepo: "",
      branches: [],
      selectedBranch: "",
    };
  },
  methods: {
    async fetchRepos() {
      console.log("fetchRepos");
      this.repos = await GithubService.getUserRepos(this.username);
    },
    async selectRepo(repoName) {
      this.selectedRepo = repoName;
      this.branches = await GithubService.getRepoBranches(
        this.username,
        repoName
      );
      if (this.branches.length) {
        this.selectedBranch = this.branches[0].name; // Automatically select the first branch
      } else {
        this.selectedBranch = "";
        this.latestCommits = []; // Reset commits if no branches
      }
    },
  },
};
</script>

<template>
  <div>
    <header><h1>Repo Browser</h1></header>
    <input
      v-model="username"
      @keyup.enter="fetchRepos"
      placeholder="GitHub Username"
    />
    <button @click="fetchRepos">Get Repos</button>
    <div v-if="repos.length > 0">
      <h2>{{ username }} Public Repositories</h2>
      <ul>
        <li v-for="repo in repos" :key="repo.id" @click="selectRepo(repo.name)">
          {{ repo.name }}
        </li>
      </ul>
    </div>
    <div v-if="selectedRepo">
      <h2>Selected Repo</h2>
      <h3>{{ selectedRepo }}</h3>
      <div v-if="branches.length > 0">
        <h3>Branches</h3>
        <select v-model="selectedBranch">
          <option
            v-for="branch in branches"
            :key="branch.name"
            :value="branch.name"
          >
            {{ branch.name }}
          </option>
        </select>
      </div>
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
