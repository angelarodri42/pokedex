// src/pages/About.tsx
import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const About: React.FC = () => (
  <div>
    <Title>About Page</Title>
    <Paragraph>This assignment was done by Sebko and Angela. Sebko is very smart and knows everything, Angela tries her best hehe </Paragraph>
  </div>
);

export default About;