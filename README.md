# Dudoku = Duel + Suoku

---
## Local Development

1. Fork and clone repo.
2. Run `yarn` to install all dependencies.
3. Run `npm i netlify-cli -g` to install the [netlify command line interface](https://docs.netlify.com/cli/get-started/).
4. Run `netlify dev --functions=functions` to start local dev environment. 
   1. the `--functions` flag tells netlify where the serverless functions are located. *e.g.* *the `functions` directory at the project root.*

## Technologies Used
1. [Gatsby](https://gatsbyjs.com)
2. [React](https://reactjs.org)
3. [Redux](https://redux.js.org)
4. [Redux Sagas](https://redux-saga.js.org)
5. [TypeScript](https://www.typescriptlang.org)
6. [Tailwind CSS](https://tailwindcss.com)
7. [PostCSS (with Tailwind CSS)](https://tailwindcss.com/docs/using-with-preprocessors/#using-postcss-as-your-preprocessor)
8. [Netlify Functions (serverless lambda functions)](https://www.netlify.com/products/functions/)