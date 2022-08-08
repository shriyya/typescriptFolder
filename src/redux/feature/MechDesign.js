import { Model, attr } from "redux-orm";

export default class MechDesign extends Model {
  static get fields() {
    return {
      id: attr(),
    };
  }

  static parse(designData) {
    // console.log(designData);
    return this.create(designData);
  }
}

MechDesign.modelName = "MechDesign";
