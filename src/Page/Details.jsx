import React from 'react';
import { useState, useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';

import axios from 'axios';

import { useParams, useHistory, useNavigate } from 'react-router-dom';
import { searchByCountry } from '../config';
import { Button } from '../Components/Button';
import Info from '../Components/Info';

const Details = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  console.log(country);
  useEffect(() => {
    axios.get(searchByCountry(name)).then(({ data }) => setCountry(data[0]));
  }, [name]);

  return (
    <div>
      <Button>
        <IoArrowBack onClick={() => navigate(-1)}> </IoArrowBack>
        Back
      </Button>
      {country && <Info {...country}></Info>}
    </div>
  );
};

export default Details;
