import {
  ALL_DATA_SAGA,
  ADD_DATA_SAGA,
  REMOVED_DATA_SAGA,
  UPDATE_DATA_SAGA,
  LOCAL_STORAGE_ID,
  LOCAL_STORAGE_VALUE,
} from "../constant";

const initialState = {
  data: [],
  localStorageId: null,
  localStorageValue: null,
};
let stateValue = [];
export const addData = (state = initialState, { type, payload }) => {
  switch (type) {
    case ALL_DATA_SAGA:
      stateValue = payload;
      state.data = payload;
      return { ...state };

    case ADD_DATA_SAGA:
      console.log(payload);

      return { ...state, data: [...state.data, payload] };

    case REMOVED_DATA_SAGA:
      console.log(payload, state);
      let dataDelete = state.data.findIndex((obj) => obj.id === payload);
      console.log(state);
      state.data.splice(dataDelete, 1);
      console.log(state);

      return { ...state };

    case LOCAL_STORAGE_ID:
      console.log(payload, state);
      state.localStorageId = payload;
      return { ...state };

    case UPDATE_DATA_SAGA:
      console.log(state, payload);
      let id = state.data.findIndex((obj) => obj.id == payload.id);
      state.data[id] = payload;
      console.log(state);
      return { ...state, data: [...state.data] };
    default:
      return state;
  }
};
