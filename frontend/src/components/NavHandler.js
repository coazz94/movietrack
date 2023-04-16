import React, { useState, useContext, createContext, useEffect } from "react"
import { useLocation } from "react-router"

const navbarState = createContext()
export const useNavbarState = () => useContext(navbarState)

export function NavbarHandler({ children }) {
    const [disabled, setDisabled] = useState(false)

    const pathname = useLocation().pathname.replace("/", "")

    useEffect(() => {
        pathname === "login" && setDisabled(() => true)
    }, [pathname])

    if (disabled) {
        return <></>
    }

    return (
        <>
            <navbarState.Provider value={disabled}>
                {children}
            </navbarState.Provider>
        </>
    )
}
