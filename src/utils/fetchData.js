export const fetchCustomers = (url, token, setCustomerList) => {
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => setCustomerList(data.results));
};
