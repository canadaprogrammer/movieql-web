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
