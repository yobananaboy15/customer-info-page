import React, {useContext} from 'react'
import {UserStatusContext} from '../contexts/UserStatusContext'

//Här ska jag använda kontext. //Visa om användaren är inloggad genom att kolla kontext. Finns det data ? Visa
//Ska den här flyttas in till någon sida eller vara en fristående komponent?

export const UserStatus = () => {
    const {userStatus} = useContext(UserStatusContext)

    return (
        <div>
            {userStatus && Object.values(userStatus).map(value => <div>{value}</div>)}
        </div>
    )
}
