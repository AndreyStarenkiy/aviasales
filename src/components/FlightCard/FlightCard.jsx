import React from 'react';
import { Card, Row, Col, Typography, Space } from 'antd';

const { Title, Text } = Typography;

const formatDuration = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}Ч ${m}М`;
};

function pluralizeStops(count) {
  if (count === 1) return 'А';
  if (count > 1 && count < 5) return 'И';
  return '';
}

function formatArrival(minutesToAdd, dateStr) {
  const date = new Date(dateStr);
  date.setMinutes(date.getMinutes() + minutesToAdd);

  const hours = String(date.getHours()).padStart(2, '0');
  const mins = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${mins}`;
}

const FlightCard = ({ price, carrier, segments }) => {
  return (
    <Card>
      <Row justify="space-between" align="middle">
        <Title
          level={3}
          style={{
            color: '#2196F3',
            margin: 0
          }}
        >
          {price.toLocaleString()} ₽
        </Title>
        <img
          src={`http://pics.avs.io/110/36/${carrier}.png`}
          alt={carrier}
          style={{
            height: 36,
            objectFit: 'contain'
          }}
        />
      </Row>
      <Space
        direction="vertical"
        size="large"
        style={{
          marginTop: 24,
          width: '100%'
        }}
      >
        {segments.map((seg, idx) => (
          <Row key={idx} gutter={16} align="middle">
            <Col flex="1 1 150px">
              <Text type="secondary">
                {seg.origin} – {seg.destination}
              </Text>
              <br />
              <Text strong>
                {new Date(seg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                {formatArrival(seg.duration, seg.date)}
              </Text>
            </Col>
            <Col flex="1 1 120px">
              <Text type="secondary">В ПУТИ</Text>
              <br />
              <Text>{formatDuration(seg.duration)}</Text>
            </Col>
            <Col flex="1 1 150px">
              <Text type="secondary">
                {seg.stops.length ? `${seg.stops.length} ПЕРЕСАДК${pluralizeStops(seg.stops.length)}` : 'БЕЗ ПЕРЕСАДОК'}
              </Text>
              <br />
              <Text>{seg.stops.join(', ')}</Text>
            </Col>
          </Row>
        ))}
      </Space>
    </Card>
  );
};

export default FlightCard;
