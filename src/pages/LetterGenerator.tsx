import { useEffect } from "react"

import JobForm from "../components/JobForm"
import { myExperiences } from "../components/MyExperiences"
import { useIsDarkMode } from "./Welcome"

export default function LetterGenerator() {
    const { isDarkMode } = useIsDarkMode()
    return (
        <div className={isDarkMode}>
            <div className="invert-0 dark:invert">
                <JobForm firstName="Michael" lastName="Yu" phoneNumber="3653668643"
                    email="nicetomeet.yu@mail.utoronto.ca" experience={myExperiences} />
            </div>
        </div>
    )
}