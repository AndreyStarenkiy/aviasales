import { createSlice } from '@reduxjs/toolkit';

const sortFilterSlice = createSlice({
  name: 'stopsFiltersEnabled',
  initialState: 'cheapest',
  reducers: {
    toggleSortFilter(state, action) {
      return action.payload;
    }
  }
});

export const { toggleSortFilter } = sortFilterSlice.actions;
export default sortFilterSlice.reducer;
