import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import Movie from '../components/Movie';

const GET_MOVEIS = gql`
  query {
    movies {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.header`
  background-image: linear-gradient(-45deg, #a1c4fd, #c2e9fb);
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Subtitle = styled.h3`
  font-size: 30px;
`;

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;

export default () => {
  const { loading, error, data } = useQuery(GET_MOVEIS);
  return (
    <Container>
      <Header>
        <Title>Apollo Movies</Title>
        <Subtitle>I love GraphQL</Subtitle>
      </Header>
      {loading && <Loading>Loading</Loading>}
      {!loading &&
        data.movies &&
        data.movies.map((m) => <Movie key={m.id} id={m.id} />)}
    </Container>
  );
};
