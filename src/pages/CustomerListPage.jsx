import React, {useContext, useEffect, useState} from 'react'
import { CustomerListItem } from '../components/CustomerListItem'
import { CustomerModal } from '../components/CustomerModal';
import {UserStatusContext} from '../contexts/UserStatusContext'
import {fetchCustomers} from "../utils/fetchData"

//Importera modal här. state som visar displayModal

export const CustomerListPage = () => {
    const {customerList, setCustomerList} = useContext(UserStatusContext);
    const url = "https://frebi.willandskill.eu/api/v1/customers/"
    const token = localStorage.getItem("WEBB20")
    // useFetch(url, token, setCustomerList)
    //Kolla om det finns data i customerList --> Om inte, fetcha.

    useEffect(() => {
        if(!customerList){
            console.log('nothing in context')
            fetchCustomers(url, token, setCustomerList)
        }
    }, [])
 
    return (
        <div>
            {customerList ? customerList.map(customer => {
                return <CustomerListItem key={customer.id} customerData={customer}/>
            }) : null}
            <CustomerModal />
        </div>
    )
}
