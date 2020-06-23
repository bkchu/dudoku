# Dudoku = Duel + Sudoku

[![Netlify Status](https://api.netlify.com/api/v1/badges/0c9ec261-02be-49f3-b905-30c22f7f67fb/deploy-status)](https://app.netlify.com/sites/dudoku/deploys)

---
## Local Development

1. Fork and clone repo.
2. Run `yarn` to install all dependencies.
3. Run `npm i netlify-cli -g` to install the [netlify command line interface](https://docs.netlify.com/cli/get-started/).
4. Run `netlify dev --functions=functions` to start local dev environment. 
   1. the `--functions` flag tells netlify where the serverless functions are located. *e.g.* *the `functions` directory at the project root.*
   
## Branches

- `master` - the production branch
- `develop` - the branch we will build features on and after testing, merge into master
   
## Contributing

#### We will use *GitFlow*. Instead of linking to a complicated article on what that is, just follow the steps below. (Look it up later)

_*If you don't already have the project locally, make sure to clone the repository [using SSH](https://help.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh).*_

---

We will have a `master` branch, and a `develop` branch, and `<feature|bugfix>/<ticket-number>-<small-summary-of-ticket>` branches. 

---

Treat the `develop` branch like the `master` branch. So when working on a new feature/bugfix, follow these steps:


1. Switch to `develop`. 
```
> git checkout develop
```
2. Pull the latest code from `develop`. `git pull`
```
> git pull
```
3. Switch to a new `feature` or `bugfix` branch using the ticket # from the associated Trello card. e.g. to create a branch for a feature with ticket #123, do the following:
```
> git checkout -b feature/123-a-summary-of-the-work
```
4. Make all commits on this newly created branch.
  - The following command stages all of your current working files to be committed:
```
> git add . 
```
  - This next command commits your work. Make sure to put a descriptive commit description that finishes this sentence: _This commit:_
```
> git commit -m "adds a new commit"
```
5. Push the new branch, and make a new pull request (PR) into `develop` on GitHub.
  - The first push on a new branch should give you more information on what command to run to actually push to GitHub
```
> git push
```
6. Other devs will review your code and leave comments/suggestions.
7. Push fixes to your code based on the comments/suggestions. 
8. Please do not resolve the comments on your own. (In the real world - on a good team - the person who made the comment will check up on the status of their comment). Meaning - if I left a comment to fix something, and you fix it, still don't resolve the comment yourself!
9. After all of the reviewer's comments are dealt with, the reviewer will resolve all of his comments, and will leave an 'LGTM' comment. (Looks Good To Me)
10. The person who opened the PR can/will merge his own pull request and then delete the branch.
11. Since the new PR was merged into `develop`, your own `develop` branch will be out of date. Therefore, pull the latest `develop` code again, making sure to switch to `develop` first.
```
> git checkout develop
> git pull
```
---
## Technologies Used
1. [Gatsby](https://gatsbyjs.com)
2. [React](https://reactjs.org)
3. [Redux](https://redux.js.org)
4. [Redux Sagas](https://redux-saga.js.org)
5. [TypeScript](https://www.typescriptlang.org)
6. [Tailwind CSS](https://tailwindcss.com)
7. [PostCSS (with Tailwind CSS)](https://tailwindcss.com/docs/using-with-preprocessors/#using-postcss-as-your-preprocessor)
8. [Netlify Functions (serverless lambda functions)](https://www.netlify.com/products/functions/)
