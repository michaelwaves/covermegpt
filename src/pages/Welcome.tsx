import NavBar from "../components/Navbar"

import { useState } from "react"
import { Outlet, useOutletContext } from "react-router-dom"

type ContextType = {
    isDarkMode?: string,
    setIsDarkMode?: () => void,
}

export default function Welcome(): JSX.Element {
    const [isDarkMode, setIsDarkMode] = useState<string>("")


    return (
        <div className={`w-screen h-auto md:h-screen ${isDarkMode == "dark" ? "bg-gray-600" : "bg-white"} flex items-center justify-center transition-75`}>
            <div className="w-[clamp(300px,90vw,1200px)]">
                <NavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}></NavBar>
                <div className="flex-grow mt-32 mb-16 w-full h-full">
                    <Outlet context={{ isDarkMode, setIsDarkMode }} />
                </div>

            </div >
        </div>
    )
}

export function useIsDarkMode() {
    return useOutletContext<ContextType>();
}