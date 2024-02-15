import { createApp, defineCustomElement } from "vue";
import GithubUserRepos from "./components/GithubUserRepos.vue";

const GithubUserReposElement = defineCustomElement(GithubUserRepos);
customElements.define("github-user-repos", GithubUserReposElement);
