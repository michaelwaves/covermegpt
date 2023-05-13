export default function Background({ isDarkMode }: { isDarkMode: string }) {
    return (
        <div className={isDarkMode}>
            <div className="w-screen h-screen absolute top-0 left-0 -z-10 dark:bg-gray-600 bg-white"></div>
        </div>
    )
}