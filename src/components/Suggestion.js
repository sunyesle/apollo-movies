import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  height: 80px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  overflow: hidden;
  border-radius: 7px;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
`;

const Title = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  color: white;
  font-size: 20px;
  text-align: center;
  padding: 10px 0;
`;

export default ({ id, bg, title }) => (
  <Container>
    <Link to={`/${id}`} style={{ textDecoration: 'none' }}>
      <Poster bg={bg}>
        <Title>{title}</Title>
      </Poster>
    </Link>
  </Container>
);
