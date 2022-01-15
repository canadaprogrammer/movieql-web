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
  height: 100vh;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  padding: 2rem;
  width: calc(75% - 4rem);
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
  width: 25%;
  height: 67%;
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
