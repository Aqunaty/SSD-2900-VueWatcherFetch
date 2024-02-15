import { createApp, defineCustomElement } from "vue";
import GithubUserRepos from "./components/GithubUserRepos.vue";

const GithubUserReposElement = defineCustomElement({
  ...GithubUserRepos,
  props: ["initialUsername"],
});
customElements.define("github-user-repos", GithubUserReposElement);
