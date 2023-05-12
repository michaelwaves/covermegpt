import { auth } from "./Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react'

export default function SignInForm() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSignIn = async (email: string, password: string) => {
        console.log(email, password)
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);

        }

    };
    return (

        <div className='flex flex-col space-y-2 items-center'>
            <input type="email" required className="input-box w-full" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" required className="input-box w-full" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="bg-white dark:bg-primary dark:text-white"
                onClick={() => handleSignIn(email, password)}
            >Sign In!</button>
        </div>
    )
}