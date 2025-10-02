import { createSlice } from "@reduxjs/toolkit";

const stackSlice = createSlice({
  name: "stack",
  initialState: {
    items: []   // nuestra pila
  },
  reducers: {
    unshift: (state, action) => {
      state.items.unshift(action.payload); // apilar
    },
    shift: (state) => {
      state.items.shift(); // desapilar
    },
    clear: (state) => {
      state.items = []; // reiniciar pila
    }
  }
});

export const { unshift, shift, clear } = stackSlice.actions;
export default stackSlice.reducer;