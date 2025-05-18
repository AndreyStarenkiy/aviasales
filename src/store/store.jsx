import { configureStore } from '@reduxjs/toolkit';

import stopsFiltersReducer from './stopsFilterSlice';
import sortFilterReducer from './sortFilterSlice';
import ticketsReducer from './flightListSlice';

const store = configureStore({
  reducer: {
    stopsFilters: stopsFiltersReducer,
    filterKey: sortFilterReducer,
    tickets: ticketsReducer
  }
});

export default store;
