import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Typography, Button, Spin } from 'antd';

const { Title, Text } = Typography;

interface LocationState {
  name: string;
  imageUrl: string;
}

const Stats: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={handleGoBack} style={{ marginBottom: '20px' }}>
        Back to Pokédex
      </Button>
      
      {pokemonData && (
        <Card style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Title level={2}>{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</Title>
            <img 
              src={state?.imageUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt={pokemonData.name}
              style={{ width: '300px', height: 'auto', marginBottom: '20px' }}
            />
            
            <div style={{ width: '100%' }}>
              <Title level={2}>Stats</Title>
              {pokemonData.stats.map((stat: any) => (
                <div key={stat.stat.name} style={{ marginBottom: '10px' }}>
                  <Text strong>{stat.stat.name.toUpperCase()}: </Text>
                  <Text>{stat.base_stat}</Text>
                </div>
              ))}
              
                <br />
                <br />
              <Title level={2}>Types</Title>
              <div style={{ display: 'flex', gap: '10px' }}>
                {pokemonData.types.map((type: any) => (
                  <div key={type.type.name}>
                    <Text>{type.type.name.toUpperCase()}</Text>
                  </div>
                ))}
              </div>
              <br />
              <br />
              <Title level={2}>Abilities</Title>
              <div>
                {pokemonData.abilities.map((ability: any) => (
                  <div key={ability.ability.name}>
                    <Text>{ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}</Text>
                    {ability.is_hidden && <Text type="secondary"> (Hidden)</Text>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Stats;