import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

// query getMovie($id: Int)  Apollo를 위한 부분
// Apollo가 변수의 type을 검사하도록 도와줌

// movie(id: $id){...} 서버로 가는 query
const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      rating
      description_intro
    }
  }
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  });
  if (loading) {
    return 'loading';
  }
  if (data && data.movie) {
    return data.movie.title;
  }
  return 'Detail';
};
