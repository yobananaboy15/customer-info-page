import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { CustomerModal } from '../components/CustomerModal'
import {UserStatusContext} from '../contexts/UserStatusContext'
import {UserStatus} from "../components/UserStatus"
import {ButtonDelete} from "../components/ButtonDelete"

export const CustomerDetailPage = (props) => {

  const {setCustomerList, userStatus} = useContext(UserStatusContext);
  const customerId = props.match.params.id
  const [customerItem, setCustomerItem] = useState(null)
  const history = useHistory()
  const location = useLocation()

  function getCustomerItem() {
    const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`
    const token = localStorage.getItem("WEBB20")
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => setCustomerItem(data))
  }

  useEffect( () => {
    getCustomerItem()
  }, [location.key])


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
		fetch("https://frebi.willandskill.eu/api/v1/customers/", {
				headers: {
				  "Content-Type": "application/json",
				  "Authorization": `Bearer ${token}`
				}
			  })
			  .then(res => res.json())
			  .then(data => {
				  setCustomerList(data.results);
				  history.push('/customers')
			  })
		})
  }

  return ( 
    <div>
    <UserStatus />
		{customerItem && userStatus ?
		(
        <div>
          <Link to="/customers">Back to customer list</Link>
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
                  <a href={customerItem.website} target="_blank" rel="noreferrer">
                    {customerItem.website}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <ButtonDelete onClick={deleteCustomer}>Delete Customer</ButtonDelete>
          <CustomerModal method='PUT' item={customerItem} urlProp={`https://frebi.willandskill.eu/api/v1/customers/${customerId}/`}/>
		  </div>
		  )
		  :
		  (
			  <span>{userStatus ? 'Loading data...' : null}</span>
		  )
		  }  
    </div>
  )
}
