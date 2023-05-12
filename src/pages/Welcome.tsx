import NavBar from "../components/Navbar"

import { useState } from "react"
import { Outlet, useOutletContext } from "react-router-dom"

type ContextType = {
    isDarkMode: string,
    setIsDarkMode: () => void,
}

export default function Welcome(): JSX.Element {
    const [isDarkMode, setIsDarkMode] = useState<string>("")


    return (
        <div className={`w-screen h-screen ${isDarkMode == "dark" ? "bg-gray-600" : "bg-white"} flex items-center justify-center transition-75`}>
            <div className="w-[clamp(300px,80vw,800px)] m-auto">
                <NavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}></NavBar>
                <Outlet context={{ isDarkMode, setIsDarkMode }} />
            </div >
        </div>
    )
}

export function useIsDarkMode() {
    return useOutletContext<ContextType>();
}