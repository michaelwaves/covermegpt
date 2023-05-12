import React, { createContext, useState } from 'react';

export const ThemeContext = createContext<string>('');

export const ThemeProvider: React.FC<any> = (props) => {
    const [isDarkMode, setIsDarkMode] = useState<string>('');

    return (
        <ThemeContext.Provider value={isDarkMode}>
            {props.children}
        </ThemeContext.Provider>
    );
};