import { createSlice } from '@reduxjs/toolkit';

export const onlineSlice = createSlice({
  name: 'online',
  initialState: {
    onlineList: [],
  },
  reducers: {
    addUser :(state, action) => {
      // takes a full user object
      state.onlineList.push(action.payload);
    },
    removeUser :(state,action) => {
        // takes a userName
      state.user = null;
      return state.filter((item) => item.userName !== action.payload);
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { addUser, removeUser,setLoading } = onlineSlice.actions;
export default onlineSlice.reducer;