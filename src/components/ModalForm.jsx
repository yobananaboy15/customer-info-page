import React, {useState, useContext} from 'react'
import {UserStatusContext} from '../contexts/UserStatusContext'
import {postData} from '../utils/postData'

export const ModalForm = () => {

    const [formData, setFormData] = useState({})
    const {customerList, setCustomerList} = useContext(UserStatusContext);

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

    function handleOnSubmit(e){
      e.preventDefault()
      const url = "https://frebi.willandskill.eu/api/v1/customers/"
      const token = localStorage.getItem("WEBB20")
      const method = "POST"
      const body = JSON.stringify(formData)
      postData(url, token, method, body, setCustomerList)
    }
      
    const renderInput = (inputData) => {
      return (
        <>
          {inputData.map(inputField => {
              return (
              <div>
                  <label>{inputField.label}</label>
                  <input 
                  type={inputField.type || 'text'}
                  name={inputField.name} 
                  value={formData[inputField.name] || ''}
                  onChange={handleOnChange}/>
              </div>
              )
          })}
        </>
      )
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
              {renderInput(inputData)}
              <button type="submit">Add customer</button>
            </form>
        </div>
    )
}