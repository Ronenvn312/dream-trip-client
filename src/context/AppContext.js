import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
    const [tourChecked, setTourChecked] = useState({})
    useEffect(() => {

    }, [tourChecked])


    return <AppContext.Provider value={{
        tourChecked,
        setTourChecked
    }}>
        {children}
    </AppContext.Provider>
}