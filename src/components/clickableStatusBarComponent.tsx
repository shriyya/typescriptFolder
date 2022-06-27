import React, { useEffect } from "react";
import { IStatusPanelParams } from "ag-grid-community";
import api from "../Api";

export default (props: IStatusPanelParams) => {
  const onClick = () => {
    console.log(props);

    alert("Selected Row Count: " + props.api.getSelectedRows().length);
  };
  // useEffect(() => {
  //   const valueByApi = api as any;
  //   const value = valueByApi.valuePost(); //.then(function (result) {
  //   const valuee = valueByApi.valueGet(); //.then(function (result) {

  //   console.log(value, valuee);
  // }, []);
  const style = {
    padding: 5,
    margin: 5,
  };

  return (
    <input
      style={style}
      type="button"
      onClick={onClick}
      value="Click Me For Selected Row Count"
    />
  );
};
