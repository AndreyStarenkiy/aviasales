import { createSlice } from '@reduxjs/toolkit';

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    loading: false,
    error: null,
    multiplier: 1,
    gettingBatches: false
  },
  reducers: {
    addTicketsBatch(state, action) {
      state.tickets = state.tickets.concat(action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    gettingBatches(state, action) {
      state.gettingBatches = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    showMoreTickets(state) {
      state.multiplier += 1;
    }
  }
});

const { addTicketsBatch, setLoading, setError, showMoreTickets, gettingBatches } = ticketsSlice.actions;

export const fetchTicketsInBatches = () => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(gettingBatches(true));
  dispatch(setError(null));
  try {
    const searchIdResp = await fetch('https://aviasales-test-api.kata.academy/search');
    if (!searchIdResp.ok) throw new Error('Failed to fetch searchId');
    const { searchId } = await searchIdResp.json();

    let stop = false;
    while (!stop) {
      try {
        // eslint-disable-next-line
        const ticketsResp = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
        if (!ticketsResp.ok) throw new Error('Tickets request failed!');
        // eslint-disable-next-line
        const data = await ticketsResp.json();
        stop = data.stop;
        if (data.tickets && Array.isArray(data.tickets) && data.tickets.length > 0) {
          dispatch(addTicketsBatch(data.tickets));
          dispatch(setLoading(false));
        }
      } catch (err) {
        // retry on error
        // eslint-disable-next-line
        continue;
      }
    }
    dispatch(setLoading(false));
    dispatch(gettingBatches(false));
  } catch (err) {
    dispatch(setError(err.message));
    dispatch(setLoading(false));
  }
};

// eslint-disable-next-line
export { addTicketsBatch, setLoading, setError, showMoreTickets, gettingBatches };
export default ticketsSlice.reducer;
