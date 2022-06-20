import fetch from 'node-fetch'

const getLastCommit = (githubUser, gitHubRepo) => {
    return new Promise((resolve) => {
        const GITHUB_API = `https://api.github.com/repos/${githubUser}/${gitHubRepo}/commits?per_page=1&page=1`
        fetch(GITHUB_API)
            .then(response => response.json())
            .then(data => {
                resolve(data[0].commit.author.date)
            })
    })
}

export  {getLastCommit}