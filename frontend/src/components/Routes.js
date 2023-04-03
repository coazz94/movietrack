import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ErrorPage from "../pages/ErrorPage"
import Homepage from "../pages/HomePage"
import MediaOverview from "../pages/MediaOverview"

export default function RouteManager() {
    return (
        <Routes>
            <Route path="" element={<Homepage />} />
            <Route path="/movies">
                <Route index element={<Navigate to={"/movies/trending"} />} />
                <Route
                    path="trending"
                    element={<MediaOverview title={"trending view"} />}
                />
                <Route
                    path="latest"
                    element={<MediaOverview title={"latest view"} />}
                />
                <Route
                    path="*"
                    element={<Navigate to={"/movies/trending"} />}
                />
            </Route>
            <Route path="/shows">
                <Route index element={<Navigate to={"/shows/trending"} />} />
                <Route
                    path="trending"
                    element={<MediaOverview title={"Shows trending view"} />}
                />
                <Route
                    path="latest"
                    element={<MediaOverview title={"Shows latest view"} />}
                />
                <Route path="*" element={<Navigate to={"/shows/trending"} />} />
            </Route>
            <Route path="/*" element={<ErrorPage />} />
        </Routes>
    )
}
