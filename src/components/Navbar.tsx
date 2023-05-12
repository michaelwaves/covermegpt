import { useState } from "react"
import DarkModeButton from "./DarkModeButton";

const NavBar = ({ isDarkMode, setIsDarkMode }: { isDarkMode: string, setIsDarkMode: Function }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={isDarkMode}>
            <nav className="transition-75 bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 dark">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" className="flex items-center">
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="h-8 mr-3"
                            alt="CoverMeGPT Logo"
                        />
                        <span className={"self-center text-2xl font-semibold whitespace-nowrap " + (isDarkMode == "dark" ? "text-white" : "text-gray-900")}>
                            CoverMeGPT
                        </span>
                    </a>
                    <DarkModeButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                    <div className="flex md:order-2">
                        <button
                            type="button"
                            className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-primary dark:focus:ring-blue-800"
                        >
                            Get started
                        </button>
                        <button
                            onClick={handleMenuToggle}
                            type="button"
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-primary focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-sticky"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div
                        className={`items-center justify-between w-full md:flex md:w-auto  md:order-1 
                        ${isMenuOpen ? 'block' : 'hidden'} 
                        ${isDarkMode == "dark" ? "invert-0" : 'invert'}
                        `}
                        id="navbar-sticky"
                    >
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 pl-3 pr-4 text-gray-900 hover:bg-primary rounded md:bg-transparent md:text-primary-light md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    aria-current="page"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-primary md:hover:text-primary-light md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Profile
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-primary  md:hover:text-primary-light md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;