import { Model, fk, attr } from "redux-orm";

export default class Mech extends Model {
  static get fields() {
    return {
      id: attr(),
      type: fk("MechDesign"),
      olympic: fk("TableView"),
    };
  }

  static parse(mechData) {
    return this.upsert(mechData);
  }
}

Mech.modelName = "Mech";
