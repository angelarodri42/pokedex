import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography, Row, Col, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Meta } = Card;

const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const offset = (currentPage - 1) * pageSize;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pageSize}`);
        setPokemons(response.data.results);
        setTotalPokemons(response.data.count);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemons();
  }, [currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handlePokemonClick = (pokemon: any) => {
    const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
    navigate(`/stats/${pokemonId}`, { 
      state: { 
        name: pokemon.name,
        imageUrl: imageUrl
      } 
    });
  };

  return (
    <div>
      <Title>Pokédex</Title>
      <Row gutter={[16, 16]}>
        {pokemons.map((pokemon) => (
          <Col key={pokemon.name} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{ width: 240, cursor: 'pointer' }}
              onClick={() => handlePokemonClick(pokemon)}
              cover={<img alt={pokemon.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/').slice(-2, -1)}.png`} />}
            >
              <Meta title={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} />
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        pageSizeOptions={[10, 20, 50, 100]}
        showSizeChanger
        onShowSizeChange={handlePageSizeChange}
        total={totalPokemons}
        onChange={handlePageChange}
        style={{ marginTop: '20px', textAlign: 'center' }}
      />
    </div>
  );
};

export default Home;