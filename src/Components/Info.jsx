import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import { filterByCode } from '../config';

const Wrapper = styled.section`
  margin-top: 3rem;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  gap: 2rem;

  @media (min-width: 767px) {
    grid-template-columns: minmax(100px, 400px) 1fr;
    align-items: center;
    gap: 5rem;
  }
  @media (min-width: 1024px) {
    grid-template-columns: minmax(400px, 600px) 1fr;
  }
`;
const InfoImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const InfoTitle = styled.h1`
  margin: 0;
  font-weight: var(--fw-normal);
`;
const ListGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;
const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const ListItem = styled.li`
  line-height: 1, 8rem;
  & > b {
    font-weight: var(--fw-bold);
  }
`;
const Meta = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  align-items: flex-start;

  & > b {
    font-weight: var(--fw-bold);
  }

  @media (min-widt: 767px) {
    flex-direction: row;
    align-items: center;
  }
`;
const TagGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;
const Tag = styled.span`
  padding: 0, 1rem;
  background-color: var(--color-ui-base);
  box-shadow: var(--shadow);
  line-height: 1.5;
  cursor: pointer;
`;

const Info = (props) => {
  const {
    name,
    nativeName,
    flag,
    capital,
    population,
    region,
    subregion,
    topLevelDomain,
    currencies = [0],
    languages = [],
    borders = [],
    
  } = props;
  const [neighbors, setNeighbors] = useState([]);
 
  const navigate = useNavigate()
  useEffect(() => {
     axios.get(filterByCode(borders)).then(({ data }) => setNeighbors(data.map((c) => c.name)));
  }, [borders]);
  return (
    <Wrapper>
      <InfoImage src={flag} alt={name}></InfoImage>
      <div>
        <InfoTitle>{name}</InfoTitle>
        <ListGroup>
          <List>
            <ListItem>
              <b>Native name</b> {nativeName}
            </ListItem>
            <ListItem>
              <b>Population</b> {population}
            </ListItem>
            <ListItem>
              <b>Sub Region</b> {subregion}
            </ListItem>
            <ListItem>
              <b>Capital</b> {capital}
            </ListItem>
          </List>
          <ListItem>
            <b>Top level Domain</b>
            {topLevelDomain.map((d) => (
              <span key={d}>d</span>
            ))}
          </ListItem>
          <ListItem>
            <b>Language</b>
            {languages.map((l) => (
              <span key={l.name}>{l.name}</span>
            ))}
          </ListItem>
          <ListItem>
            <b>Curensies</b>
            {currencies.map((c) => (
              <span key={c.code}>{c.name}</span>
            ))}
          </ListItem>

          <List></List>
        </ListGroup>
        <Meta>
          <b> Border countries </b>
          {borders.lenght ? (
            <span>No border countries</span>
          ) : (
            <TagGroup>
              {neighbors.map((b) => (
                <Tag key={b} onClick={() => navigate(`/country/${b}`)}>
                  {b}
                </Tag>
              ))}
            </TagGroup>
          )}
        </Meta>
      </div>
    </Wrapper>
  );
};

export default Info;
