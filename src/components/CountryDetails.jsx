import React from "react";
import { useParams } from "react-router-dom";

export default function CountryDetails() {
  let { country } = useParams();
  return <h3>Country slug: {country}</h3>;
}
