import {
  ALL_DATA_SAGA,
  ADD_DATA_SAGA,
  REMOVED_DATA_SAGA,
  UPDATE_DATA_SAGA,
  ALL_DATA,
  ADD_DATA,
  REMOVED_DATA,
  UPDATE_DATA,
  MECH_DATA,
  MECH_DESIGN_DATA,
  ALL_MECH_DESIGN_DATA,
  ALL_MECH_DATA_SAGA,
  LOCAL_STORAGE_ID,
  LOCAL_STORAGE_VALUE,
  LOCAL_STORAGE_ID_SAGA,
  LOCAL_STORAGE_VALUE_SAGA,
} from "./constant";
import { put, all, takeLatest, call } from "redux-saga/effects";

export function* fetchDataSaga() {
  let response = yield fetch("http://localhost:4000/olympic");
  let res = yield response.json();
  let data = res;
  yield put({ type: ALL_DATA_SAGA, payload: data });
}
export function* fetchMechDesignSaga() {
  let response = yield fetch("http://localhost:4000/designs");
  let res = yield response.json();
  let data = res;
  yield put({ type: ALL_MECH_DESIGN_DATA, payload: data });
}
export function* fetchMechDataSaga() {
  let response = yield fetch("http://localhost:4000/mechs");
  let res = yield response.json();
  let data = res;
  yield put({ type: ALL_MECH_DATA_SAGA, payload: data });
}

let url = "http://localhost:4000/olympic";

export function* addDataSaga({ type, userValue }) {
  let header = {
    method: "POST",
    body: JSON.stringify({
      athlete: userValue.athlete,
      age: userValue.age,
      country: userValue.country,
      year: userValue.year,
      date: userValue.date,
      sport: userValue.sport,
      gold: userValue.gold,
      silver: userValue.silver,
      bronze: userValue.bronze,
      total: userValue.total,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  let response = yield fetch(url, header);
  let res = yield response.json();
  let data = res;
  yield put({ type: ADD_DATA_SAGA, payload: data });
}
export function* updateDataSaga({ type, userValue }) {
  let header = {
    method: "PUT",
    body: JSON.stringify({
      athlete: userValue.athlete,
      age: userValue.age,
      country: userValue.country,
      year: userValue.year,
      date: userValue.date,
      sport: userValue.sport,
      gold: userValue.gold,
      silver: userValue.silver,
      bronze: userValue.bronze,
      total: userValue.total,
      id: userValue.id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  let response = yield fetch(url + "/" + userValue.id, header);
  let res = yield response.json();
  let data = res;
  yield put({ type: UPDATE_DATA_SAGA, payload: data });
  return data;
}
export function* removeDataSaga({ type, payload }) {
  let header = {
    method: "DELETE",
  };
  let response = yield fetch(url + "/" + payload, header);
  let res = yield response.json();
  yield put({ type: REMOVED_DATA_SAGA, payload: payload });
}

export function* watchDataSaga() {
  yield takeLatest(ALL_DATA, fetchDataSaga);
}

export function* watchMechDataSaga() {
  yield takeLatest(MECH_DATA, fetchMechDataSaga);
}

export function* watchMechDesignSaga() {
  yield takeLatest(MECH_DESIGN_DATA, fetchMechDesignSaga);
}

export function* watchAddDataSaga() {
  yield takeLatest(ADD_DATA, addDataSaga);
}

export function* watchUpdateDataSaga() {
  yield takeLatest(UPDATE_DATA, updateDataSaga);
}
export function* watchDeleteDataSaga() {
  yield takeLatest(REMOVED_DATA, removeDataSaga);
}

export default function* rootSaga() {
  yield all([
    call(watchDataSaga),
    call(watchAddDataSaga),
    call(watchUpdateDataSaga),
    call(watchDeleteDataSaga),
    call(watchMechDataSaga),
    call(watchMechDesignSaga),
  ]);
}
