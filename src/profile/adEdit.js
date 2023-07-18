import React from "react";
import AdInsert from "./adInsert";
import { useLocation } from "react-router-dom";

export default function AdEdit() {
  let { state } = useLocation();
  console.log(state);
  return <AdInsert editData={state} />;
}
