interface profileSelectorProps {
    setProfileNum: Function,
    state: any

}


export default function ProfileSelector({ setProfileNum, state }: profileSelectorProps) {

    const profileButtons = state.profiles ? state.profiles.map((profile: any, index: any) => {
        return (
            <button className="dark:bg-primary dark:text-white" onClick={() => setProfileNum(index)}>{profile.name}</button>
        )
    }) : <div>Add a profile in the profile page!</div>

    return (
        <div className="flex flex-row space-x-2 p-2 dark:bg-gray-500 rounded-xl bg-secondary-light border-[1px] border-gray-500 mb-2">
            {profileButtons}
        </div>
    )
}