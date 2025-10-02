import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState:{
        count: 0
    },
    reducers:{
        increment: (state) =>{
            state.count += 1
        },
        decrement: (state) =>{
            state.count -=1
        },
        incrementByValue: (state, action) => {
            const value = Number(action.payload);
            if (Number.isFinite(value)) {
              state.count += value;
            }
          
        }
    },
});

export const {increment, decrement, incrementByValue} = counterSlice.actions

export default counterSlice.reducer