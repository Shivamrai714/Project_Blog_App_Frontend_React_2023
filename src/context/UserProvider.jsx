import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getCurrentUserDetail, isLoggedIn } from '../auth'
import userContext from './userContext'


// STEP 2 : Create the UserProvider Component

function UserProvider({ children }) {

    const [user, setUser] = useState({
        data: {},
        login: false
    })

    useEffect(() => {
        setUser({
            data: getCurrentUserDetail(),
            login: isLoggedIn()
        })
    }, [])



    return (

        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>

    )
}

export default UserProvider