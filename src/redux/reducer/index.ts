import { combineReducers } from "redux";
import { addData } from "./reducer";
import { ormData } from "./entity";
export const rootReducer = combineReducers({
  alldata: addData,
  entity: ormData,
  // mech: ormMechData,
  // mechDesign: ,
  // mechDesign: reducer,

  // loadData:loadData
});
