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

## Reset Style

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

## Set Apollo Client and Get Movies Query

- Create `/src/apollo.js`

  - ```jsx
    import { ApolloClient, InMemoryCache } from '@apollo/client';

    const client = new ApolloClient({
      uri: 'http://localhost:4000/',
      cache: new InMemoryCache(),
    });

    export default client;
    ```

- On `index.js`

  - ```jsx
    ...
    import { ApolloProvider } from '@apollo/client';
    import client from './apollo';

    ReactDOM.render(
      <React.StrictMode>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </React.StrictMode>,
      document.getElementById('root')
    );
    ```

- On `Home.js`

  - ```jsx
    import { gql, useQuery } from '@apollo/client';

    const GET_MOVIES = gql`
      {
        movies {
          id
          medium_cover_image
        }
      }
    `;

    export default () => {
      const { loading, error, data } = useQuery(GET_MOVIES);
      if (loading) {
        return 'loading...';
      }
      if (data && data.movies) {
        return data.movies.map((movie) => <h1 key={movie.id}>{movie.id}</h1>);
      }
      return <h1>Home</h1>;
    };
    ```

## Style by `styled-components`

- On `Home.js`

  - ```jsx
    import styled from 'styled-components';

    const Container = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    `;

    const Header = styled.header`
      background-image: linear-gradient(-45deg, #d754ab, #fd723a);
      height: 45vh;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    `;

    const Title = styled.h1`
      font-size: 60px;
      font-weight: 600;
      margin-bottom: 20px;
    `;

    const SubTitle = styled.h3`
      font-size: 35px;
    `;
    const Loading = styled.div`
      font-size: 18px;
      opacity: 0.5;
      font-weight: 500;
      margin-top: 10px;
    `;

    export default () => {
      const { loading, data } = useQuery(GET_MOVIES);
      return (
        <Container>
          <Header>
            <Title>Apollo</Title>
            <SubTitle>I love GraphQL</SubTitle>
          </Header>
          {loading && <Loading>Loading...</Loading>}
          {!loading && data.movies?.map((m) => <Movie key={m.id} id={m.id} />)}
        </Container>
      );
    };
    ```
    
