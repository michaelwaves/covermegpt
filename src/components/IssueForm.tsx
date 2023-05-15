import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../components/Firebase";
import { useAuth } from "../components/Firebase";

const uploadIssue = async (title: string, body: string, uid: string) => {

    await addDoc(collection(db, "issues"), {
        title: title,
        body: body,
        uid: uid
    })
}


const IssueForm: React.FC = () => {
    const { user } = useAuth()
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
            uploadIssue(title, body, user.uid)
            setTitle('');
            setBody('');
        } else {
            console.log("error, no user")
        }
    };

    return (
        <div className='flex flex-col m-auto items-center text-gray-900 dark:text-white w-[clamp(400px,50vw,800px)]'>
            <h2>🐛Or Submit A Bug Report Below</h2>
            <form onSubmit={handleSubmit} className='bg-secondary-light dark:bg-gray-900 p-4 rounded-xl space-y-2 w-[clamp(400px,50vw,800px)]'>
                <div>
                    <input
                        id="issue-title"
                        className='input-box w-full dark:bg-primary dark:placeholder-white'
                        type="text"
                        value={title}
                        placeholder='Title'
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className='flex flex-row items-center justify-center'>
                    <textarea
                        id="issue-body"
                        className='input-box w-full h-40 dark:bg-primary dark:placeholder-white'
                        value={body}
                        placeholder='Describe the 🐛'
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit 🐛</button>
            </form>
        </div>
    );
};

export default IssueForm;