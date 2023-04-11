import React, { useEffect, useState, useContext, createContext } from "react"

export const BASE_URL = "http://127.0.0.1:8000"

const TrendingMovies = createContext()
const TrendingShows = createContext()

export const useMovies = () => useContext(TrendingMovies)
export const useShows = () => useContext(TrendingShows)

export function DataProvider({ children }) {
    const [trendingMovies, setTrendingMovies] = useState([])
    const [trendingShows, setTrendingShows] = useState([])

    function getMovieData(section) {
        fetch(
            BASE_URL +
                "/trakt/get-trending-data" +
                `?type=movies&section=${section}&page=${1}&size=${10}`
        )
            .then((response) => response.json())
            .then((data) => {
                setTrendingMovies(() => data)
            })
    }

    function getShowData(section) {
        fetch(
            BASE_URL +
                "/trakt/get-trending-data" +
                `?type=shows&section=${section}&page=${1}&size=${10}`
        )
            .then((response) => response.json())
            .then((data) => {
                setTrendingShows(() => data)
            })
    }

    useEffect(() => {
        getMovieData("trending")
        getShowData("trending")
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
