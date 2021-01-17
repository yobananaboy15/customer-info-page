import React, {useContext} from 'react'
import {UserStatusContext} from '../contexts/UserStatusContext'
import {Link} from 'react-router-dom'

export const UserStatus = () => {
    const {userStatus} = useContext(UserStatusContext)
    return (
        <div>
            {userStatus ? (
                <div>
                    <p>User: {userStatus.firstName} {userStatus.lastName}
                    <br/>
                    Email: {userStatus.email}
                    </p>
                </div>
            ) : <p>Du är inte inloggad. Logga in <Link to="/login">här</Link></p>}
        </div>
    )
}
