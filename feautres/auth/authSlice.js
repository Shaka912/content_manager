import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{data:null, status:'idle'},
    reducers: {
        setUser: (state, action) => {
          state.data = action.payload;
          state.status = 'loggedIn';
        },
        logoutUser: (state) => {
          state.data = null;
          state.status = 'idle';
        },
      },
});
export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
