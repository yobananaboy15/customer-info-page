import React, { useState, useEffect, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import {UserStatusContext} from "../contexts/UserStatusContext"
import {fetchCustomers} from "../utils/fetchData"

export const CustomerDetailPage = (props) => {
  const {customerList, setCustomerList} = useContext(UserStatusContext)
  const customerId = props.match.params.id
  const customerItem = customerList.find(element => element.id === Number(customerId))
  const history = useHistory()

  function deleteCustomer() {
    const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`
    const token = localStorage.getItem("WEBB20")
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(() => {
        fetchCustomers("https://frebi.willandskill.eu/api/v1/customers", token, setCustomerList)
        history.push('/customers');
    })
  }

  return (
    <div>
        <div>
          <h1>{customerItem.name}</h1>
          <table>
            <tbody>
              <tr>
                <td>Organisation Number</td>
                <td>{customerItem.organisationNr}</td>
              </tr>

              <tr>
                <td>Payment Term</td>
                <td>{customerItem.paymentTerm}</td>
              </tr>

              <tr>
                <td>Phone Number</td>
                <td>{customerItem.phoneNumber}</td>
              </tr>

              <tr>
                <td>Reference</td>
                <td>{customerItem.reference}</td>
              </tr>

              <tr>
                <td>VAT Number</td>
                <td>{customerItem.vatNr}</td>
              </tr>

              <tr>
                <td>Email</td>
                <td>
                  <a href={`mailto:${customerItem.email}`}>
                    {customerItem.email}
                  </a>
                </td>
              </tr>

              <tr>
                <td>Website</td>
                <td>
                  <a href={customerItem.website} target="_blank">
                    {customerItem.website}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={deleteCustomer}>Delete Customer</button>
          <Link to={`/customers/${customerId}/edit`}>Edit Customer</Link> 
        </div>
    </div>
  )
}
