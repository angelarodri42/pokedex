// src/pages/About.tsx
import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const About: React.FC = () => (
  <div>
    <Title>About Page</Title>
    <Paragraph>This is the about page of our application.</Paragraph>
  </div>
);

export default About;