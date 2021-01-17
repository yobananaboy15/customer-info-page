import React, {useContext, useEffect} from 'react'
import { CustomerListItem } from '../components/CustomerListItem'
import { CustomerModal } from '../components/CustomerModal';
import {UserStatusContext} from '../contexts/UserStatusContext'
import {UserStatus} from "../components/UserStatus"


export const CustomerListPage = () => {
    const {customerList, setCustomerList, userStatus} = useContext(UserStatusContext);

    function getCustomerList() {
        const url = "https://frebi.willandskill.eu/api/v1/customers/"
        const token = localStorage.getItem("WEBB20")
        fetch(url, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })
        .then(res => res.json())
        .then(data => setCustomerList(data.results))
      }

    useEffect(() => {
        if(!customerList && userStatus){
            getCustomerList();
        }
    }, [])
 
    return (
        <div>
            <UserStatus />
            {customerList && userStatus ? 
            (
                <div>
                    <h1>Customers</h1>
                    {customerList.map(customer => {
                    return <CustomerListItem key={customer.id} customerData={customer}/>
                    })}
                    <CustomerModal method="POST" item={{}} urlProp="https://frebi.willandskill.eu/api/v1/customers/"/>
                </div>
            ) 
            :  <span>{userStatus ? 'Loading data...' : null}</span>}
        </div>
    )
}
