import { useEffect, useState } from "react"
import { useAuth } from "../components/Firebase"
import { getUserData } from "../components/Firebase"
import { useNavigate } from "react-router-dom"

import JobForm from "../components/JobForm"
import { useIsDarkMode } from "./Welcome"
import { DocumentData } from "firebase/firestore"
import ProfileSelector from "../components/ProfileSelector"

export default function LetterGenerator() {
    const { isDarkMode } = useIsDarkMode()
    const { user } = useAuth()
    const [userData, setUserData] = useState<DocumentData | null>()
    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const data = await getUserData(user.uid)
                setUserData(data)
                console.log(data)
            } else {
                setUserData(null)
            }
        }
        fetchUserData()

    }, [user])

    const navigate = useNavigate()

    if (user == null) {
        navigate("/")
    }
    const [profileNum, setProfileNum] = useState(0)
    return (
        <div className={isDarkMode + " w-full"}>
            <div className="w-full">

                {userData &&
                    <>
                        <ProfileSelector setProfileNum={setProfileNum} state={userData} />
                        <JobForm firstName={userData?.firstName} lastName={userData?.lastName} phoneNumber={userData?.phoneNumber}
                            email={userData?.email} experience={userData?.profiles[profileNum].experience} />

                    </>}
            </div>
        </div>
    )
}