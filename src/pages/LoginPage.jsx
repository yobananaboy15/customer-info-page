import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

export const LoginPage = () => {

    const [loginData, setLoginData ] = useState({email: "webb19@willandskill.se", password: "javascriptoramverk"})
    const history = useHistory()

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
              history.push("/customers")
          })
          //Felhantering här? med try catch om det funkar, kör history.push, annars skriv felmeddelandet.
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <label>Email</label>
                <input name="email" value={loginData.email} onChange={handleOnChange}/>
                <label>Password</label>
                <input name="password" value={loginData.password} onChange={handleOnChange}/>
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}
