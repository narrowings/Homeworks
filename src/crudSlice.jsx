import { createSlice } from "@reduxjs/toolkit";

export const crudSlice = createSlice({
  name: "crud",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action) => {
      state.items = state.items.map(item =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deleteItemLocal: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

export const { setItems, addItem, updateItem, deleteItemLocal } = crudSlice.actions;
