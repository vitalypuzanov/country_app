import axios from 'axios';
import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import List from '../Components/List';
import Card from '../Components/Card';
import Controls from '../Components/Controls';
import { ALL_COUNTRIES } from '../config';

export const HomePage = () => {
  const [countries, SetCountries] = useState([]);
  
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(ALL_COUNTRIES).then(({ data }) => SetCountries(data));
  }, []);

  const [filtredCountries, setFilteredCountries] = useState(countries);

  const handleSearch = (search, region) => {
    let data = [...countries];
  

    if (region) {
      data = data.filter((c) => c.region.includes(region));
    }

    if (search) {
      data = data.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
    }

    setFilteredCountries(data);
    console.log(filtredCountries);
  };

  useEffect(() => {
    if (!countries.length) axios.get(ALL_COUNTRIES).then(({ data }) => SetCountries(data));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [countries]);

  return (
    <>
      {/* <Controls /> */}
      <Controls onSearch={handleSearch} />
      <List>
        {filtredCountries.map((c) => {
          const countryInfo = {
            img: c.flags.png,
            name: c.name,
            info: [
              {
                title: 'Population',
                description: c.population.toLocaleString(),
              },
              {
                title: 'Region',
                description: c.region,
              },
              {
                title: 'Capital',
                description: c.capital,
              },
            ],
          };

          return <Card key={c.name} onClick={()=> navigate(`/country/${c.name}`)}{...countryInfo} />;
        })}
      </List>
    </>
  );
};

// (`/country/${c.name}`)
