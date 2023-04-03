import React, { useEffect, useState, useContext, createContext } from "react"

export const BASE_URL = "http://127.0.0.1:8000"

const TrendingMovies = createContext()

export const useMovies = () => useContext(TrendingMovies)

export function DataProvider({ children }) {
    const [trendingMovies, setTrendingMovies] = useState([])

    function getTrendingMovies() {
        fetch(BASE_URL + "/trakt/get-data")
            .then((response) => response.json())
            .then((data) => {
                setTrendingMovies(() => data)
            })
    }

    useEffect(() => {
        getTrendingMovies()
    }, [])

    return (
        <>
            <TrendingMovies.Provider value={trendingMovies}>
                {children}
            </TrendingMovies.Provider>
        </>
    )
}
