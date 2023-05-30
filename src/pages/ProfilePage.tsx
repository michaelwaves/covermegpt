import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { getUserData } from "../components/Firebase";
import { DocumentData } from "firebase/firestore";
import EditMultiProfile from "../components/EditMultiProfile";
import { useIsDarkMode } from "./Welcome";
import { useAuth } from "../components/Firebase";
export default function ProfilePage() {
    const { isDarkMode } = useIsDarkMode()
    const { user } = useAuth()
    const [_, setUserData] = useState<DocumentData | null>()
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

    return (
        <div className={isDarkMode}>
            <EditMultiProfile />
        </div>
    )
}