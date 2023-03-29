import { useContext, createContext, useState, useEffect } from "react";

const MainContext = createContext();

export const MainAppProvider = ({children}) => {

    let [lastRead, setLastRead] = useState({});
    let [dataLastRead, setDataLastRead] = useState({})

    return (
        <MainContext.Provider value={{ lastRead, setLastRead }}>
            {children}
        </MainContext.Provider>
    )
}

export const NewMainContext = () => {
    return useContext(MainContext)
}