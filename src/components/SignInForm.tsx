
export default function SignInForm() {
    return (

        <div className='flex flex-col space-y-2 items-center'>
            <input type="text" className="input-box w-full" placeholder="email" />
            <input type="text" className="input-box w-full" placeholder="password" />
        </div>
    )
}