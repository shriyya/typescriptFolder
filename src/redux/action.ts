import {
  ALL_DATA,
  ADD_DATA,
  REMOVED_DATA,
  UPDATE_DATA,
  LOCAL_STORAGE_ID,
  MECH_DATA,
  MECH_DESIGN_DATA,
} from "./constant";

export const fetchData = () => {
  return { type: ALL_DATA };
};
export const fetchMech = () => {
  return { type: MECH_DATA };
};
export const fetchMechDesign = () => {
  return { type: MECH_DESIGN_DATA };
};

// type dataFormate = { userId: string; id: number; title: string; body: string };

export const localStorageId = (payload) => {
  return { type: LOCAL_STORAGE_ID, payload: payload };
};

// export const localStorageValue = (data) => {
//   return { type: LOCAL_STORAGE_VALUE, payload: data };
// };

export const addData = (data) => {
  return { type: ADD_DATA, userValue: data };
};

export const updateData = (data) => {
  console.log(data);
  return { type: UPDATE_DATA, userValue: data };
};

export const removeData = (id) => {
  console.log(id);

  return { type: REMOVED_DATA, payload: id };
};
