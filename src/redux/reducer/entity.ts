import orm from "../schema";
import TableView from "../feature/TableView";
import Mech from "../feature/Mech";
import MechDesign from "../feature/MechDesign";

import { retry } from "redux-saga/effects";
import {
  ALL_DATA_SAGA,
  ALL_MECH_DATA_SAGA,
  ALL_MECH_DESIGN_DATA,
} from "../constant";
const initialStates = orm.getEmptyState();
const session = orm.session(initialStates);
console.log(session);
let stateValue = [];

export const ormData = (state = initialStates, { type, payload }) => {
  const { TableView, Mech, MechDesign } = session;

  switch (type) {
    case ALL_DATA_SAGA:
      payload.forEach((pilot) => TableView.parse(pilot));
      return session.state;

    case ALL_MECH_DATA_SAGA:
      payload.forEach((pilot) => Mech.parse(pilot));
      return session.state;

    case ALL_MECH_DESIGN_DATA:
      payload.forEach((pilot) => MechDesign.parse(pilot));
      return session.state;

    default:
      return state;
  }
};
