# MovieQL Web

Movie Web App with React, Apollo, and GraphQL

## Initial Set Up CRA

- `yarn create react-app movieql-web`

- Remove files under `src` folder except `App.js` and `index.js`

- Move `App.js` from `/src.` to `/src/components/`

  - ```
    function App() {
      return <div className='App'></div>;
    }

    export default App;
    ```

- On `index.js`

  - ```jsx
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './components/App';

    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
    ```

- Change the title on `/public/index.html`

- `yarn add styled-components react-router-dom @apollo/client graphql`

- `git remote add origin git@github.com:canadaprogrammer/movieql-web.git`
