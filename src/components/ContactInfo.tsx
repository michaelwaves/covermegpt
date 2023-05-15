import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';

const copyIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
</svg>


export default function ContactInfo() {
    const [isCopied, setIsCopied] = useState(false);
    const email = 'covermegpt@gmail.com';

    const handleCopyClick = () => {
        navigator.clipboard.writeText(email);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    };

    return (
        <div className=' p-2 m-auto bg-secondary-light w-[clamp(400px,50vw,800px)] dark:bg-primary dark:text-white rounded-xl flex flex-col items-center'>
            <h2>📞Contact the Developer</h2>
            <div className='flex flex-row space-x-2 relative justify-end'>
                <p>{email}</p>
                <div onClick={handleCopyClick}>
                    {copyIcon}</div>
                <AnimatePresence>
                    {isCopied && (

                        <motion.div
                            key="contact-tooltip"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                            className="absolute bg-white dark:bg-gray-900 dark:text-white text-black text-xs px-2 py-1 rounded top-8 right-0"
                        >
                            Copied!
                        </motion.div>

                    )}</AnimatePresence>
            </div>

        </div>
    )
}