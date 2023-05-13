import Profile from "../components/Profile";
import EditProfile from "../components/EditProfile";
import { useIsDarkMode } from "./Welcome";
export default function ProfilePage() {
    const { isDarkMode } = useIsDarkMode()
    return (
        <div className={isDarkMode}>
            <EditProfile />
        </div>
    )
}