import React, { useEffect, useState, useContext, createContext } from "react"

export const BASE_URL = "http://127.0.0.1:8000"

const TrendingMovies = createContext()
const TrendingShows = createContext()

export const useMovies = () => useContext(TrendingMovies)
export const useShows = () => useContext(TrendingShows)

export function DataProvider({ children }) {
    const [trendingMovies, setTrendingMovies] = useState([])
    const [trendingShows, setTrendingShows] = useState([])
    // const [popularShows, setPopularShows] = useState([])

    function getMovieData(section, size) {
        fetch(
            BASE_URL +
                "/trakt/get-trending-data" +
                `?type=movies&section=${section}&page=${1}&size=${size}`
        )
            .then((response) => response.json())
            .then((data) => {
                setTrendingMovies(() => data)
            })
    }

    function getShowData(section, size) {
        fetch(
            BASE_URL +
                "/trakt/get-trending-data" +
                `?type=shows&section=${section}&page=${1}&size=${size}`
        )
            .then((response) => response.json())
            .then((data) => {
                setTrendingShows(() => data)
            })
    }

    useEffect(() => {
        getMovieData("trending", 20)
        getShowData("trending", 20)
    }, [])

    return (
        <>
            <TrendingMovies.Provider value={trendingMovies}>
                <TrendingShows.Provider value={trendingShows}>
                    {children}
                </TrendingShows.Provider>
            </TrendingMovies.Provider>
        </>
    )
}
