import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import Suggestion from '../components/Suggestion';

// query getMovie($id: Int)  Apollo를 위한 부분
// Apollo가 변수의 type을 검사하도록 도와줌

// movie(id: $id){...} 서버로 가는 query
const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
      id
      title
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #96deda, #50c9c3);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 15px;
  font-weight: 600;
`;

const Subtitle = styled.h4`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 22px;
  font-weight: 100;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 14px;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

const Suggestions = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 100%;
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  });
  return (
    <Container>
      <Column>
        <Title>
          {loading
            ? 'Loading...'
            : `${data.movie.title} ${data.movie.isLiked ? '❤' : ''}`}
        </Title>
        <Subtitle>
          {data?.movie?.language}
          {data && ' · '}
          {data?.movie?.rating}
        </Subtitle>
        <Description>{data?.movie?.description_intro}</Description>
        <br />
        <br />
        {data && (
          <>
            <Subtitle>Suggestions</Subtitle>
            <Suggestions>
              {data.suggestions.map((m) => (
                <Suggestion
                  key={m.id}
                  id={m.id}
                  bg={m.medium_cover_image}
                  title={m.title}
                />
              ))}
            </Suggestions>
          </>
        )}
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}></Poster>
    </Container>
  );
};
