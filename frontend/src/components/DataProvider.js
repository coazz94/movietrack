import React, { useEffect, useState, useContext, createContext } from "react"

const TrendingMovies = createContext()

export const useMovies = () => useContext(TrendingMovies)

export function DataProvider({ children }) {
    const [trendingMovies, setTrendingMovies] = useState([])

    function getTrendingMovies() {
        fetch("trakt/get-data")
            .then((response) => response.json())
            .then((data) => {
                setTrendingMovies((prevData) => data)
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
