import { useState, useEffect } from 'react';
import { Button, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import SortFilter from '../SortFilter/SortFilter.jsx';
import StopsFilter from '../StopsFilter/StopsFilter.jsx';
import FlightList from '../FlightList/FlightList.jsx';
import { toggleStopsFilters } from '../../store/stopsFilterSlice.jsx';
import { toggleSortFilter } from '../../store/sortFilterSlice.jsx';
import { fetchTicketsInBatches, showMoreTickets } from '../../store/flightListSlice.jsx';

import AppStyles from './App.module.css';

const LoadMoreButton = ({ onClick }) => {
  const dispatch = useDispatch();

  return (
    <div className={AppStyles['load-more-btn']}>
      <Button style={{ width: '502px', height: '50px' }} type="primary" onClick={() => dispatch(showMoreTickets())}>
        ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ!
      </Button>
    </div>
  );
};

function getFilteredAndSortedTickets(tickets, checkedStops, sortPattern) {
  const filtered = tickets.filter((ticket) => {
    return ticket.segments.every((segment) => {
      const stopsCount = segment.stops.length.toString();
      return checkedStops.includes('all') || checkedStops.includes(stopsCount);
    });
  });

  let sorted;
  if (sortPattern === 'cheapest') {
    sorted = filtered.sort((a, b) => a.price - b.price);
  } else if (sortPattern === 'fastest') {
    sorted = filtered.sort((a, b) => {
      const aDuration = a.segments[0].duration + a.segments[1].duration;
      const bDuration = b.segments[0].duration + b.segments[1].duration;
      return aDuration - bDuration;
    });
  } else if (sortPattern === 'optimal') {
    const prices = filtered.map((t) => t.price);
    const durations = filtered.map((t) => t.segments[0].duration + t.segments[1].duration);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const minDuration = Math.min(...durations);
    const maxDuration = Math.max(...durations);

    sorted = filtered.sort((a, b) => {
      const aPriceNorm = (a.price - minPrice) / (maxPrice - minPrice || 1);
      const aDurationNorm =
        (a.segments[0].duration + a.segments[1].duration - minDuration) / (maxDuration - minDuration || 1);

      const bPriceNorm = (b.price - minPrice) / (maxPrice - minPrice || 1);
      const bDurationNorm =
        (b.segments[0].duration + b.segments[1].duration - minDuration) / (maxDuration - minDuration || 1);

      const aScore = aPriceNorm + aDurationNorm;
      const bScore = bPriceNorm + bDurationNorm;
      return aScore - bScore;
    });
  } else {
    sorted = filtered.sort((a, b) => a.price - b.price);
  }

  return sorted;
}

const App = () => {
  const [cards, setCards] = useState(Array(5).fill({ price: '13 400', segments: ['HKG', 'JNB', 'HKG'] }));

  const dispatch = useDispatch();
  const filtersEnabled = useSelector((state) => state.stopsFilters);
  const sortKey = useSelector((state) => {
    return state.filterKey;
  });
  const tickets = useSelector((state) => state.tickets.tickets);
  const loading = useSelector((state) => state.tickets.loading);
  const gettingTickets = useSelector((state) => state.tickets.gettingBatches);
  const error = useSelector((state) => state.tickets.error);

  const filteredTickets = getFilteredAndSortedTickets(tickets, filtersEnabled, sortKey);

  useEffect(() => {
    dispatch(fetchTicketsInBatches());
  }, [dispatch]);

  const handleStopsChange = (value) => {
    dispatch(toggleStopsFilters(value));
  };

  const handleSortChange = (key) => {
    dispatch(toggleSortFilter(key));
  };

  const handleLoadMore = () => {
    setCards((prev) => [...prev, ...Array(5).fill({ price: '13 400', segments: ['HKG', 'JNB', 'HKG'] })]);
  };

  return (
    <main className={AppStyles.main}>
      <img src="assets/Logo.svg" alt="aviasales" className={AppStyles['avia-logo']} />
      <div className={AppStyles['app-container']}>
        <StopsFilter selected={filtersEnabled} onChange={handleStopsChange} />
        <div className={AppStyles.container}>
          <SortFilter style={{ height: '70px' }} active={sortKey} onChange={handleSortChange} />
          {loading ? <Spin /> : <FlightList tickets={filteredTickets} gettingTickets={gettingTickets} />}
          {loading || filteredTickets.length === 0 ? null : <LoadMoreButton onClick={handleLoadMore} />}
        </div>
      </div>
    </main>
  );
};

export default App;
