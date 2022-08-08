import React, { useEffect, useState } from "react";
import TableView from "./components/TableView";
import api from "./Api";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  fetchData,
  fetchMech,
  addData,
  updateData,
  fetchMechDesign,
  removeData,
  localStorageId,
} from "./redux/action";
import { createSelector } from "reselect";

import orm from "./redux/schema";
import { makeGetTabeldataByID } from "./redux/feature/TableSelector";

type dataFormate = { userId: number; id: number; title: string; body: string };

interface AppProps {
  firstName: string;
  lastName?: string;
}

function App(prop, { firstName, lastName }: AppProps) {
  useEffect(() => {
    prop.fetchData();
    prop.fetchMech();
    prop.fetchMechDesign();
  }, []);
  return (
    <div style={{ padding: "5% 15%" }} className="App">
      <TableView prop={prop} data-test-id="tableview" />
    </div>
  );
}

export const selectEntities = (state) => state.entity;

export const getEntitiesSession = createSelector(selectEntities, (entities) => {
  return orm.session(entities);
});

const mapToState = (state) => {
  const session = getEntitiesSession(state);
  let pioltsValue;
  setTimeout(() => {
    const { TableView } = session;
    const pilots = TableView.all()
      .toModelArray()
      .map((pilotModel) => {
        console.log(pilotModel);
        const { mech, year } = pilotModel;
        console.log("mech.olympic.athlete=>", mech.olympic.athlete);
        console.log("mech.type.id=>", mech.type.id);
        let pilot = {
          ...pilotModel.ref,
        };
        if (mech && mech.type) {
          //   console.log(mech);
          pilot.mechType = mech.type.id;
        }
        return pilot;
      });
    pioltsValue = pilots;
  }, 1000);

  return state;
};

export default connect(mapToState, {
  fetchData,
  fetchMech,
  addData,
  updateData,
  removeData,
  fetchMechDesign,
  localStorageId,
})(App);
