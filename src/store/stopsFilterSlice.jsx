import { createSlice } from '@reduxjs/toolkit';

const stopsFilterSlice = createSlice({
  name: 'stopsFiltersEnabled',
  initialState: ['0', '1', '2'],
  reducers: {
    toggleStopsFilters(state, action) {
      const { payload } = action;
      const hadAll = state.includes('all');
      const hasAll = payload.includes('all');
      const picked = payload.filter((f) => f !== 'all');

      if (hadAll && hasAll && picked.length < 5) {
        return picked;
      }
      if (hasAll) {
        return ['all', '0', '1', '2', '3'];
      }
      if (hadAll && !hasAll) {
        return [];
      }
      if (!hasAll && picked.length === 4) {
        return ['all', '0', '1', '2', '3'];
      }
      return picked;
    }
  }
});

export const { toggleStopsFilters } = stopsFilterSlice.actions;
export default stopsFilterSlice.reducer;
