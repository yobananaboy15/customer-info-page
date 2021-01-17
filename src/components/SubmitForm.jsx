import React, {useContext, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {UserStatusContext} from '../contexts/UserStatusContext';
import Form from "react-bootstrap/Form"
import {Button} from "../components/Button"



export const SubmitForm = ({method, item, urlProp, closeModal}) => {

	const {setCustomerList} = useContext(UserStatusContext)
	const [formData, setFormData] = useState(item)
	const history = useHistory()

    const inputData = [
        {name: "name", label: "Customer Name"}, 
        {name: "email", label: "Customer Email", type: "email"}, 
        {name: "organisationNr", label: "Organisation Number"}, 
        {name: "paymentTerm", label: "Payment Term", type: "number"}, 
        {name: "phoneNumber", label: "Phone Number", type: "tel"}, 
        {name: "reference", label: "Reference"}, 
        {name: "vatNr", label: "Vat Number"}, 
        {name: "website", label: "Website", type:"url"}
    ]

    function handleOnChange(e) {
        const name = e.target.name
        const value = e.target.value
        const newObj = {...formData, [name]: value}
        setFormData(newObj)
	  }
	  
	const validatvatNr = (vatNumber) =>{
		const regex = /SE\d{10}$/
		return regex.test(vatNumber)
	}

    function handleOnSubmit(e){
		e.preventDefault()
		if(!validatvatNr(formData.vatNr))
		{
			alert('Please enter a valid VAT number (SE followed by 10 digits)')
			return;
		}
		closeModal()
		const url = urlProp;
		const token = localStorage.getItem("WEBB20")
		fetch(url, {
		  method,
		  body: JSON.stringify(formData),
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
				  if(method === "POST"){
					history.push("/customers")
				  } else {
					history.push(`/customers/${item.id}`)
				  }
				})
		})
	}
      
    const renderInput = (inputData) => {
      return (
        <>
          {inputData.map((inputField, index) => {
              return (
              <Form.Group key={index}>
                  <Form.Label>{inputField.label}</Form.Label>
                  <Form.Control 
                  type={inputField.type || 'text'}
                  name={inputField.name} 
                  value={formData[inputField.name] || ''}
                  onChange={handleOnChange}/>
              </Form.Group>
              )
          })}
        </>
      )
    }

    return (
        <div>
            <Form onSubmit={handleOnSubmit}>
              {renderInput(inputData)}
			  <Button type="submit">{method === 'POST' ? 'Add customer' : 'Update customer'}</Button>
            </Form>
        </div>
    )
}