const API_BASE_URL = "https://api.github.com";

export default {
  getUserRepos(username) {
    return fetch(`${API_BASE_URL}/users/${username}/repos`).then((res) =>
      res.json()
    );
  },
  getRepoBranches(username, repoName) {
    return fetch(`${API_BASE_URL}/repos/${username}/${repoName}/branches`).then(
      (res) => res.json()
    );
  },
};
