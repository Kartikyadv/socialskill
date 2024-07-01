import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "useraddress",
    initialState: {
        username: null,
    },
    reducers: {
        addusername: (state,action) => {
            state.username.push(action.payload);
          },
    }
})
export const { addusername} = userSlice.actions
export default userSlice.reducer