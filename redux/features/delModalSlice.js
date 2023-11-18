import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deLModalActive: "",
  resDelModalActive: "",
  showOrderActive: false,
  catDelModalActive: "",
  offerDelModalActive: "",
  orderDelModalActive: "",
  delhistoryActive: "",
};

export const delModalSlice = createSlice({
  name: "delModal",
  initialState,
  reducers: {
    openDelModal: (state, action) => {
      state.deLModalActive = action.payload;
    },
    closeDelModal: (state) => {
      state.deLModalActive = false;
    },
    showOrderModal: (state,action) => {
      state.showOrderActive = action.payload;
    },
    closeOrderModal: (state) => {
      state.showOrderActive = false;
    },
    openResDelModal: (state, action) => {
      state.resDelModalActive = action.payload;
    },
    closeResDelModal: (state) => {
      state.resDelModalActive = false;
    },
    openDelCatModal: (state, action) => {
      state.catDelModalActive = action.payload;
      console.log(action.payload);
    },
    closeDelCatModal: (state) => {
      state.catDelModalActive = false;
    },
    openDelOfferModal: (state, action) => {
      state.offerDelModalActive = action.payload;
    },
    closeDelOfferModal: (state) => {
      state.offerDelModalActive = false;
    },
    openOrderDelModal: (state, action) => {
      state.orderDelModalActive = action.payload;
    },
    closeOrderDelModal: (state) => {
      state.orderDelModalActive = false;
    },
    openHisDelModal: (state, action) => {
      state.delhistoryActive = action.payload;
    },
    closeHisDelModal: (state) => {
      state.delhistoryActive = false;
    },
  },
});

export const {
  openDelModal,
  closeDelModal,
  showOrderModal,
  closeOrderModal,
  openResDelModal,
  closeResDelModal,
  openDelCatModal,
  closeDelCatModal,
  openDelOfferModal,
  closeDelOfferModal,
  openHisDelModal,
  closeHisDelModal,
  openOrderDelModal,
  closeOrderDelModal
} = delModalSlice.actions;

export default delModalSlice.reducer;
