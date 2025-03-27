// src/pages/Dashboard.tsx
import React from 'react';
import { Typography, Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Dashboard: React.FC = () => (
  <div>
    <Title>Dashboard</Title>
    <Row gutter={16}>
      <Col span={8}>
        <Card>
          <Statistic
            title="Active Users"
            value={846}
            prefix={<UserOutlined />}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="Orders"
            value={125}
            prefix={<ShoppingCartOutlined />}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="Revenue"
            value={9280}
            prefix={<DollarOutlined />}
            suffix="$"
          />
        </Card>
      </Col>
    </Row>
  </div>
);

export default Dashboard;