
export default function Profile() {
    const infoList = ["firstName", "lastName", "email", "phoneNumber"]
    const components = infoList.map((info) => (
        <input type="text" placeholder={info} name={info} key={info}
            className="p-2 w-full rounded-xl bg-primary invert dark:invert-0 dark:text-white font-bold my-2" />
    ))
    return (
        <div className="w-[clamp(300px,50vw,800px)] dark p-2 rounded-xl">
            {components}
        </div>
    )
}