import { useContext, createContext, useState, useEffect } from "react";

const suratContext = createContext();

export const SuratAppProvider = ({children}) => {

    let [lastRead, setLastRead] = useState({});
    let [dataLastRead, setDataLastRead] = useState({})

    // useEffect(() => {
    //     const storedData = JSON.parse(localStorage.getItem(lastRead))
    //     setDataLastRead(storedData);
    // }, [])

    const halo = () => {
        alert("asdadasd")
    }

    return (
        <suratContext.Provider value={{ lastRead, setLastRead, halo }}>
            {children}
        </suratContext.Provider>
    )
}

export const newSuratContext = () => {
    return useContext(suratContext)
}