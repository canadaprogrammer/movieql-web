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

- `touch .prettierignore` and add `README.md` on the `.prettierignore`

## Router

- ```bash
  mkdir src/routes
  touch src/routes/Home.js
  touch src/routes/Detail.js
  ```

- On `Home.js` and `Detail.js`

  - `export default () => <h1>Home</h1>;`

- On `App.js`

  - ```jsx
    import { HashRouter as Router, Routes, Route } from 'react-router-dom';
    import Detail from '../routes/Detail';
    import Home from '../routes/Home';

    function App() {
      return (
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:id' element={<Detail />} />
          </Routes>
        </Router>
      );
    }

    export default App;
    ```

## Style

- Copy Reset Style from https://meyerweb.com/eric/tools/css/reset/

  - `touch public/reset.css`
  
    - ```css
      /* http://meyerweb.com/eric/tools/css/reset/ 
        v2.0 | 20110126
        License: none (public domain)
      */
      html, body, div, span, applet, object, iframe,
      h1, h2, h3, h4, h5, h6, p, blockquote, pre,
      a, abbr, acronym, address, big, cite, code,
      del, dfn, em, img, ins, kbd, q, s, samp,
      small, strike, strong, sub, sup, tt, var,
      b, u, i, center,
      dl, dt, dd, ol, ul, li,
      fieldset, form, label, legend,
      table, caption, tbody, tfoot, thead, tr, th, td,
      article, aside, canvas, details, embed, 
      figure, figcaption, footer, header, hgroup, 
      menu, nav, output, ruby, section, summary,
      time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
      }
      /* HTML5 display-role reset for older browsers */
      article, aside, details, figcaption, figure, 
      footer, header, hgroup, menu, nav, section {
        display: block;
      }
      body {
        line-height: 1;
      }
      ol, ul {
        list-style: none;
      }
      blockquote, q {
        quotes: none;
      }
      blockquote:before, blockquote:after,
      q:before, q:after {
        content: '';
        content: none;
      }
      table {
        border-collapse: collapse;
        border-spacing: 0;
      }
      ```

- On `index.html`

  - `<link rel="stylesheet" href="%PUBLIC_URL%/reset.css" />`
