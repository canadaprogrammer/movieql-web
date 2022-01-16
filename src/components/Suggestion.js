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
