import { useEffect } from "react"

import JobForm from "../components/JobForm"
import { myExperiences } from "../components/MyExperiences"
import { useIsDarkMode } from "./Welcome"

export default function LetterGenerator() {
    const { isDarkMode } = useIsDarkMode()
    return (
        <div className={isDarkMode + " w-full"}>
            <div className="w-full">
                <JobForm firstName="Michael" lastName="Yu" phoneNumber="3653668643"
                    email="nicetomeet.yu@mail.utoronto.ca" experience={myExperiences} />
            </div>
        </div>
    )
}