// src/pages/Home.tsx
import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => (
  <div>
    <Title>Home Page</Title>
    <Paragraph>Welcome to the home page of our application.</Paragraph>
  </div>
);

export default Home;