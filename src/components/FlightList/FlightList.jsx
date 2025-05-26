import { useSelector } from 'react-redux';
import { Spin } from 'antd';

import FlightCard from '../FlightCard/FlightCard.jsx';

import FlightListStyles from './FlightList.module.css';

const FlightList = ({ tickets, gettingTickets }) => {
  const multiplier = useSelector((state) => state.tickets.multiplier);
  const spin = (
    <div
      style={{
        width: '150px',
        position: 'absolute',
        right: '-170px',
        top: '30px'
      }}
    >
      <Spin
        className={FlightListStyles['ant-spin']}
        style={{
          position: 'absolute',
          right: 0,
          top: '-74px'
        }}
        spinning={true}
        tip="Ищем лучшие билеты"
      >
        {' '}
      </Spin>
    </div>
  );

  return (
    <div className={FlightListStyles['flight-list']}>
      {tickets.length === 0 ? 'Рейсов, подходящих под заданные фильтры, не найдено' : null}
      {tickets.slice(0, 5 * multiplier).map((ticket, i) => (
        <FlightCard key={i} price={ticket.price} carrier={ticket.carrier} segments={ticket.segments} />
      ))}
      {gettingTickets ? spin : null}
    </div>
  );
};

export default FlightList;
