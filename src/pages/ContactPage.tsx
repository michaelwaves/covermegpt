import IssueForm from "../components/IssueForm";
import ContactInfo from "../components/ContactInfo";
import { useIsDarkMode } from "./Welcome";
import { useAuth } from "../components/Firebase";
export default function ContactPage() {
    const { isDarkMode } = useIsDarkMode()
    const { user } = useAuth()
    return (
        <div className={isDarkMode}>
            <ContactInfo />
            {user &&
                <IssueForm />}
        </div>
    )
}