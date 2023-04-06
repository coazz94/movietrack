import React, { useEffect, useState, useContext, createContext } from "react"

export const BASE_URL = "http://127.0.0.1:8000"

const TrendingMovies = createContext()

export const useMedia = () => useContext(TrendingMovies)

export function DataProvider({ children }) {
    const [trendingMovies, setTrendingMovies] = useState([])
    const [trendingShows, setTrendingShows] = useState([])

    function getData(type = "movies", section = "trending") {
        fetch(
            BASE_URL +
                "/trakt/get-trending-data" +
                `?type=${type}&section=${"trending"}&page=${1}`
        )
            .then((response) => response.json())
            .then((data) => {
                setTrendingMovies(() => data)
            })
    }

    useEffect(() => {
        getData("movies", "trending")
        // getTrendingShow()
    }, [])

    return (
        <>
            <TrendingMovies.Provider value={trendingMovies}>
                {children}
            </TrendingMovies.Provider>
        </>
    )
}
