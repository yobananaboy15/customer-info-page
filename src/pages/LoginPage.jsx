import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {UserStatusContext} from '../contexts/UserStatusContext'
import Form from 'react-bootstrap/Form'
import {Button} from "../components/Button" 

export const LoginPage = () => {

    const [loginData, setLoginData ] = useState({email: "Axel.Thiel@yh.nackademin.se", password: "javascriptoramverk"})
    const {setUserStatus} = useContext(UserStatusContext)
    const history = useHistory()

    const fetchUserStatus = () => {
        fetch("https://frebi.willandskill.eu/api/v1/me", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("WEBB20")}`
              }
          })
          .then(response => response.json())
          .then(data => {
              setUserStatus(data);
              history.push("/customers")
            })
    }

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLoginData({...loginData, [name] : value})
    }
    
   const handleOnSubmit = (e) => {
        e.preventDefault();
        const url = "https://frebi.willandskill.eu/api-token-auth/"
        const payload = {
            email: loginData.email,
            password: loginData.password
          }
          fetch(url, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(res => res.json())
          .then(data => {
              localStorage.setItem('WEBB20', data.token)
              fetchUserStatus();
          })
    }


    return (
        <Form onSubmit={handleOnSubmit} className="w-50">
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control name='email' type="email" value={loginData.email} onChange={handleOnChange} />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control name="password" type="password" value={loginData.password} onChange={handleOnChange} />
  </Form.Group>
  <Button type="submit">
    Log in
  </Button>
</Form>
    )
}
