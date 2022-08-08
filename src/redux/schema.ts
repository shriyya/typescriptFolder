import { ORM } from "redux-orm";
import TableView from "./feature/TableView";
import Mech from "./feature/Mech";
import MechDesign from "./feature/MechDesign";

const orm = new ORM({
  stateSelector: (state) => state.orm,
});
orm.register(TableView, Mech, MechDesign);

export default orm;
