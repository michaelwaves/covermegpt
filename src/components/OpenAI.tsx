import { useState } from "react";
import { ChatCompletionResponseMessage, Configuration, OpenAIApi } from "openai";
import ClipLoader from "react-spinners/ClipLoader";

import DownloadPDF from "./DownloadPDF";
const configuration = new Configuration({
    apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type PromptProps = {
    jobTitle: string,
    jobCompany: string,
    jobDescription: string,
    experience: string,
    firstName: string,
    lastName: string,
}

export default function OpenAI({ jobTitle, jobCompany, jobDescription, experience, firstName, lastName }: PromptProps) {
    const prompt = `write a cover letter for ${jobTitle} at ${jobCompany}. 
    It has the following job description: ${jobDescription}.
    My experiences are the following: ${experience}.
    My name is ${firstName} ${lastName}.
    `
    const [_, setApiResponse] = useState<ChatCompletionResponseMessage | undefined>()
    const [coverLetter, setCoverLetter] = useState<string | undefined>()
    const [loading, setLoading] = useState(false);
    const getCoverLetter = async () => {
        setLoading(true)
        try {
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 400,
            });
            const message = completion.data.choices[0].message
            if (message) {
                const responseContent = message.content.toString()
                console.log(responseContent)
                setCoverLetter(responseContent)
            }
            console.log(message);
            setApiResponse(message)
            setLoading(false)
        } catch (e) {
            console.error("Error: ", e)
        }

    }

    const handleChange = (e: any) => {
        setCoverLetter(e.target.value)
    }


    return (
        <div className="flex flex-col space-y-2 mt-2 md:w-1/2 w-full dark:text-white">
            <button onClick={getCoverLetter} className="self-center justify-center dark:bg-gray-900 bg-secondary-light">Create Cover Letter!</button>
            {coverLetter &&
                <>
                    <textarea value={coverLetter} onChange={(e) => handleChange(e)}
                        className="input-box text-area dark:text-white"
                        placeholder="Your Custom Cover Letter!" />

                    <DownloadPDF jobTitle={jobTitle} firstName={firstName} lastName={lastName} content={coverLetter ?? "Cover Letter Not Found"} />
                </>}
            <div className="self-center justify-center">
                <ClipLoader loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" />
            </div>

        </div>
    )
}

