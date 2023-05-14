import { useState } from "react"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./Firebase";

export default function ResumeUpload() {
    const [_, setFile] = useState<File>();
    const [resumeLink, setResumeLink] = useState<string>("")

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            throw new Error("File does not exist")
        }
        try {
            const myFile = e.target.files[0]
            setFile(myFile)
            const storageRef = ref(storage, myFile.name);
            uploadBytes(storageRef, myFile).then(async () => {
                const link = await getDownloadURL(storageRef)
                console.log(link)
                setResumeLink(link)
                console.log(resumeLink)
            })
        } catch (e) {
            console.error(e)
        }

    }
    return (
        <div className="m-auto dark:text-white font-bold flex flex-col items-center w-full">
            <h3>Upload Resume!</h3>
            <input type="file" accept=".pdf,.docx" id="resume-upload" onChange={(e) => handleFileChange(e)} className="input-box w-full" />
        </div>
    )
}