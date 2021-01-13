import React from "react";
import { fetchCustomers } from "../utils/fetchData";

export const postData = (url, token, method, body, setCustomerList) => {
  console.log(url, token, method, body, setCustomerList);
  fetch(url, {
    method,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(() => {
    fetchCustomers(
      "https://frebi.willandskill.eu/api/v1/customers/",
      token,
      setCustomerList
    );
  });
};
