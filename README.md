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

    const Movies = styled.div`
      padding: 2rem;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-flow: row;
      grid-gap: 2rem;
      width: calc(100% - 4rem);
      margin-top: -8rem;
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
          {!loading && (
            <Movies>
              {data.movies?.map((m) => (
                <Movie key={m.id} id={m.id} bg={m.medium_cover_image} />
              ))}
            </Movies>
          )}
        </Container>
      );
    };
    ```

## Get Movie Query By ID

- On `/components/Movie.js`

  - ```jsx
    import { Link } from 'react-router-dom';

    export default ({ id }) => (
      <div>
        <Link to={`/${id}`}>{id}</Link>
      </div>
    );
    ```

- On `Detail.js`

  - ```jsx
    import { useParams } from 'react-router-dom';
    import { gql, useQuery } from '@apollo/client';

    const GET_MOVIE = gql`
      query getMovie($id: Int!) {
        movie(id: $id) {
          id
          title
          medium_cover_image
          description_full
        }
      }
    `;

    export default () => {
      const { id } = useParams();
      const { loading, data } = useQuery(GET_MOVIE, {
        variables: { id: Number(id) },
      });
      if (loading) {
        return 'Loading...';
      }
      if (data && data.movie) {
        return data.movie.title;
      }
    };
    ```

## Style

- On `Movie.js`

  - ```jsx
    import { Link } from 'react-router-dom';
    import styled from 'styled-components';

    const Container = styled.div`
      height: 700px;
      width: 100%;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      overflow: hidden;
      border-radius: 7px;
    `;

    const Poster = styled.div`
      background-image: url(${(props) => props.bg});
      height: 100%;
      width: 100%;
      background-size: cover;
      background-position: center;
    `;

    export default ({ id, bg }) => (
      <Container>
        <Link to={`/${id}`}>
          <Poster bg={bg} />
        </Link>
      </Container>
    );
    ```

- On `Detail.js`

  - ```jsx
    import { useParams } from 'react-router-dom';
    import { gql, useQuery } from '@apollo/client';
    import styled from 'styled-components';

    const GET_MOVIE = gql`
      query getMovie($id: Int!) {
        movie(id: $id) {
          id
          title
          medium_cover_image
          language
          rating
          description_full
        }
      }
    `;

    const Container = styled.div`
      background-image: linear-gradient(-45deg, #d754ab, #fd723a);
      min-height: 100vh;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      color: white;
    `;

    const Column = styled.div`
      padding: 2rem;
      width: calc(100% - 4rem - 19rem);
    `;

    const Title = styled.h1`
      font-size: 65px;
      margin-bottom: 15px;
    `;

    const SubTitle = styled.h3`
      font-size: 35px;
      margin-bottom: 10px;
    `;

    const Description = styled.p`
      font-size: 28px;
    `;

    const Poster = styled.div`
      width: 19rem;
      height: 28rem;
      background-image: url(${(props) => props.image});
      background-size: cover;
      background-position: center;
    `;

    export default () => {
      const { id } = useParams();
      const { loading, data } = useQuery(GET_MOVIE, {
        variables: { id: Number(id) },
      });
      return (
        <Container>
          {loading ? (
            'Loading...'
          ) : (
            <>
              <Column>
                <Title>{data.movie.title}</Title>
                <SubTitle>
                  {data.movie.language} / {data.movie.rating}
                </SubTitle>
                <Description>{data.movie.description_full}</Description>
              </Column>
              <Poster image={data.movie.medium_cover_image} />
            </>
          )}
        </Container>
      );
    };
    ```

## Get Suggestions Query By ID and the Style

- On `Detail.js`

  - ```jsx
    import Suggestion from '../components/Suggestion';

    const GET_MOVIE = gql`
      query getMovie($id: Int!) {
        ...
        suggestions(id: $id) {
          id
          title
          medium_cover_image
          language
          rating
          description_full
        }
      }
    `;

    export default () => {
              ...
              {data.suggestions.map((s) => (
                <Suggestion key={s.id} {...s} />
              ))}
            </>
          )}
        </Container>
      );
    };
    ```

- Create `src/components/Suggestion.js`

  - ```jsx
    import { Link } from 'react-router-dom';
    import styled from 'styled-components';

    const Suggestion = styled.div`
      margin: 1rem;
      padding: 1rem;
      width: calc(25% - 4rem);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      overflow: hidden;
      border-radius: 7px;
      background-color: white;
      text-align: center;
      &:hover {
        background-image: linear-gradient(-45deg, #d754ab, #fd723a);
      }
    `;

    const NavLink = styled(Link)`
      text-decoration: none;
      color: black;
      &:hover {
        color: white;
      }
    `;

    const Cover = styled.div`
      width: 10rem;
      height: 15rem;
      background-image: url(${(props) => props.image});
      background-size: cover;
      background-position: center;
      margin: -1rem auto 1rem;
      border-bottom-left-radius: 7px;
      border-bottom-right-radius: 7px;
    `;

    const SugTitle = styled.h3`
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    `;

    const Summary = styled.p`
      font-size: 20px;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box !important;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      white-space: normal;
      margin-top: 1rem;
    `;

    export default ({
      id,
      medium_cover_image,
      title,
      language,
      rating,
      description_full,
    }) => {
      return (
        <Suggestion>
          <NavLink to={`/${id}`}>
            <Cover image={medium_cover_image} />
            <SugTitle>{title}</SugTitle>
            <SugTitle>{`${language} - ${rating}`}</SugTitle>
            <Summary>{description_full}</Summary>
          </NavLink>
        </Suggestion>
      );
    };
    ```

## Local State

- On `apollo.js`

  - ```jsx
    const client = new ApolloClient({
      uri: 'http://localhost:4000/',
      cache: new InMemoryCache(),
      resolvers: {
        Movie: {
          isLiked: () => false,
        },
        Mutation: {
          toggleLikeMovie: (_, { id }, { cache }) => {
            cache.modify({
              id: `Movie:${id}`,
              fields: {
                isLiked: (isLiked) => !isLiked,
              },
            });
          },
        },
      },
    });

    export default client;
    ```

- On `Home.js`

  - ```jsx
    const GET_MOVIES = gql`
      {
        movies {
          id
          medium_cover_image
          isLiked @client
        }
      }
    `;

    <Movies>
      {data.movies?.map((m) => (
        <Movie
          key={m.id}
          id={m.id}
          bg={m.medium_cover_image}
          isLiked={m.isLiked}
        />
      ))}
    </Movies>
    ```

- On `Movie.js`

  - ```jsx
    import { gql, useMutation } from '@apollo/client';

    const LIKE_MOVIE = gql`
      mutation toggleLikeMovie($id: Int!) {
        toggleLikeMovie(id: $id) @client
      }
    `;

    export default ({ id, bg, isLiked }) => {
      const [toggleMovie] = useMutation(LIKE_MOVIE, {
        variables: { id: parseInt(id) },
      });
      return (
        <Container>
          <Link to={`/${id}`}>
            <Poster bg={bg} />
          </Link>
          <button onClick={toggleMovie}>{isLiked ? 'Unlike' : 'Like'}</button>
        </Container>
      );
    };
    ```

- On `Detail.js`

  - ```jsx
    const GET_MOVIE = gql`
      query getMovie($id: Int!) {
        movie(id: $id) {
          ...
          id              // it needs to be identified.
          isLiked @client
        }
    
    return (
      <Container>
      ...
              <Title>
                {`${data.movie.title} ${data.movie.isLiked ? '????' : '????'}`}
              </Title>
    ```


## Chrome App: Apollo Client Devtools

- It has bugs and not good, but it's only app for Apollo.

- You can check the cache and queries.

