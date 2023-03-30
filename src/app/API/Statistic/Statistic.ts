import { createSlice } from "@reduxjs/toolkit";
import api from "../API";

const initialState = {
  card: {
    doanhThu: 0,
    donHang: 0,
    daBan: 0,
    khachHang: 0,
  },
  line: [],
  pie: [],
  tree: {
    name: "root",
    children: [],
  },
};

const statistic = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    setCard(state, action) {
      state.card = action.payload;
    },
    setLine(state, action) {
      state.line = action.payload;
    },
    setPie(state, action) {
      state.pie = action.payload;
    },
    setTree(state, action) {
      state.tree.children = action.payload;
    },
  },
});

export const { setCard, setLine, setPie, setTree } = statistic.actions;

export const getCard = () => async (dispatch: any) => {
  api
    .get("/statistic")
    .then((res) => {
      dispatch(setCard(res.data));
    })
    .catch((err) => {})
    .finally(() => {});
};

export const getLine = () => async (dispatch: any) => {
  api
    .get("/statistic/line")
    .then((res) => {
      dispatch(setLine(res.data));
    })
    .catch((err) => {})
    .finally(() => {});
};

export const getPie = () => async (dispatch: any) => {
  api
    .get("/statistic/pie")
    .then((res) => {
      dispatch(setPie(res.data));
    })
    .catch((err) => {})
    .finally(() => {});
};

export const getTree = () => async (dispatch: any) => {
  api
    .get("/statistic/tree")
    .then((res) => {
      dispatch(setTree(res.data));
    })
    .catch((err) => {})
    .finally(() => {});
};

export default statistic.reducer;
