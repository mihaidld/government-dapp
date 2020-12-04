import React from "react";
import BecomeCitizen from "../components/BecomeCitizen";

/* TODO: consider using useReducer and context for contracts */

function CitizenTab() {
  return <BecomeCitizen />;
  //return {!isCitizen && <BecomeCitizen />};
}

export default CitizenTab;
