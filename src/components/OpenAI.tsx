import { useState } from "react";
import { ChatCompletionResponseMessage, Configuration, OpenAIApi } from "openai";

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
    const [apiResponse, setApiResponse] = useState<ChatCompletionResponseMessage | undefined>()
    const [coverLetter, setCoverLetter] = useState<string | undefined>()
    const getCoverLetter = async () => {
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
        } catch (e) {
            console.error("Error: ", e)
        }

    }

    const handleChange = (e: any) => {
        setCoverLetter(e.target.value)
    }

    return (
        <div>
            <button onClick={getCoverLetter}>Create Cover Letter!</button>
            <input type="text" value={coverLetter} onChange={(e) => handleChange(e)}
                className="input-box"
                placeholder="Cover Letter" />
        </div>
    )
}

