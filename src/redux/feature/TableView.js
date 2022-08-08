import { Model, fk, attr } from "redux-orm";

export default class TableView extends Model {
  static get fields() {
    return {
      athlete: attr(),
      age: attr(),
      country: attr(),
      year: attr(),
      sport: attr(),
      gold: attr(),
      silver: attr(),
      bronze: attr(),
      total: attr(),
      id: attr(),
      mech: fk("Mech"),
    };
  }

  static parse(tabData) {
    return this.create(tabData);
  }

  static generate(newAttributes = {}) {
    const combinedAttributes = {
      ...defaultAttributes,
      ...newAttributes,
    };

    return this.create(combinedAttributes);
  }

  toJSON() {
    return { ...this.ref };
  }

  updateFrom(otherPilot) {
    this.update(otherPilot.ref);
  }
}

TableView.modelName = "TableView";
