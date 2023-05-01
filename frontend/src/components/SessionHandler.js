import React, { useState, useContext, createContext, useEffect } from "react"
import { BASE_URL } from "./DataProvider"

const sessionState = createContext()
export const checkSession = () => useContext(sessionState)

export function SessionHandler({ children }) {
    const [authenticated, setAuth] = useState(false)

    function getSession() {
        fetch(BASE_URL + "/auth" + "/user")
            .then((response) => response.json())
            .then((data) => {
                if (data["user"]) {
                    setAuth(() => true)
                }
            })
    }

    useEffect(() => {
        getSession()
    }, [])

    return (
        <>
            <sessionState.Provider value={authenticated}>
                {children}
            </sessionState.Provider>
        </>
    )
}
