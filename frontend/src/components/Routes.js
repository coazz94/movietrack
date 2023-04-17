import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ErrorPage from "../pages/ErrorPage"
import Homepage from "../pages/HomePage"
import MediaOverview from "../pages/MediaOverview"
import MediaPage from "../pages/MediaPage"
import LoginPage from "../pages/LoginPage"

export default function RouteManager() {
    return (
        <Routes>
            <Route path="" element={<Homepage />} />
            <Route path="/movies">
                <Route index element={<Navigate to={"/movies/trending"} />} />
                <Route
                    path="trending"
                    element={<MediaOverview section={"trending"} />}
                />
                <Route
                    path="popular"
                    element={<MediaOverview section={"popular"} />}
                />
                <Route path=":title" element={<MediaPage />} />
                <Route
                    path="*"
                    element={<Navigate to={"/movies/trending"} />}
                />
            </Route>
            <Route path="/shows">
                <Route index element={<Navigate to={"/shows/trending"} />} />
                <Route
                    path="trending"
                    element={<MediaOverview section={"trending"} />}
                />
                <Route
                    path="popular"
                    element={<MediaOverview section={"popular"} />}
                />
                <Route path=":title" element={<MediaPage />} />
                <Route path="*" element={<Navigate to={"/shows/trending"} />} />
            </Route>
            <Route path="/*" element={<ErrorPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    )
}
