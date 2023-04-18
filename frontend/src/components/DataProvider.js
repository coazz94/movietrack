import React, { useEffect, useState, useContext, createContext } from "react"
import { useLocation } from "react-router"

export const BASE_URL = "http://127.0.0.1:8000"
const SECTIONS = ["trending", "popular", "recommended", "watched"]

const TraktData = createContext()
export const useTraktData = () => useContext(TraktData)

export function APIProvider({ children }) {
    const location = useLocation()
    const [traktData, setMovies] = useState([])

    async function getTraktData(media, section, size) {
        const response = await fetch(
            BASE_URL +
                "/trakt/get-trending-data" +
                `?type=${media}&section=${section}&page=${1}&size=${size}`
        )

        if (!response.ok) {
            const message = `An error has occurred: ${response.status}`
            throw new Error(message)
        }

        const data = await response.json()

        return data
    }

    useEffect(() => {
        const locationPath = location.pathname.split("/")

        if (
            locationPath[2] !== undefined &&
            SECTIONS.includes(locationPath[2])
        ) {
            getTraktData(locationPath[1], locationPath[2], 20)
                .then((data) => setMovies(() => data))
                .catch((error) => console.error(error.message))
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
