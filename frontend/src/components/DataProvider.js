import React, { useEffect, useState, useContext, createContext } from "react"
import { useLocation } from "react-router"

export const BASE_URL = "http://127.0.0.1:8000"

const TraktData = createContext()

export const useTraktData = () => useContext(TraktData)

export function APIProvider({ children }) {
    const location = useLocation()
    const [traktData, setMovies] = useState([])

    function getTraktData(media, section, size) {
        fetch(
            BASE_URL +
                "/trakt/get-trending-data" +
                `?type=${media}&section=${section}&page=${1}&size=${size}`
        )
            .then((response) => response.json())
            .then((data) => {
                setMovies(() => data)
            })
    }

    useEffect(() => {
        const locationPath = location.pathname.split("/")

        if (locationPath[2] !== undefined && locationPath[2].length > 0) {
            console.log("DATA LOADED")
            getTraktData(locationPath[1], locationPath[2], 20)
        }
    }, [location])

    return (
        <>
            <TraktData.Provider value={traktData}>
                {children}
            </TraktData.Provider>
        </>
    )
}
