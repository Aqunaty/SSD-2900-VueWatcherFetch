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
      latestCommits: [],
    };
  },
  //   lifecycle hook
  mounted() {
    // automatically focus on the input when the component is mounted
    // this.$refs.usernameInput.focus(); // this is the Vue2 way
    usernameInput.focus();
  },
  watch: {
    async selectedBranch(newBranch) {
      if (newBranch) {
        await this.fetchLatestCommits(this.selectedRepo, newBranch);
      }
    },
  },
  methods: {
    async fetchRepos() {
      this.repos = await GithubService.getUserRepos(this.username);
      //   reset branches, commits, and selected branch when fetching new repos
      this.selectedRepo = "";
      this.branches = [];
      this.selectedBranch = "";
      this.latestCommits = [];
      //   reset and refocus on the input
      this.username = "";
      //   this.$nextTick() is a Vue method that waits for the next DOM update cycle
      this.$nextTick(() => {
        this.$refs.usernameInput.focus();
      });
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
    async fetchLatestCommits(repoName, branch) {
      this.latestCommits = await GithubService.getRepoLatestCommit(
        this.username,
        repoName,
        branch
      );
      this.latestCommits = this.latestCommits.slice(0, 5); // Get the most recent 5 commits
      console.log(this.latestCommits);
    },
  },
};
</script>

<template>
  <div>
    <header><h1>Repo Browser</h1></header>
    <input
      v-model="username"
      ref="usernameInput"
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
    <div v-if="latestCommits.length > 0">
      <h3>Latest Commits</h3>
      <ul>
        <li v-for="(commit, index) in latestCommits" :key="index">
          <h4>
            {{ commit.commit.author.name }}
            {{ new Date(commit.commit.author.date).toLocaleString() }}
          </h4>
          - {{ commit.commit.message }}
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
