import { useContext, createContext, useState, useEffect } from "react";

const MainContext = createContext();

export const MainAppProvider = ({ children }) => {
  let [lastRead, setLastRead] = useState({});
  let [dataLastRead, setDataLastRead] = useState({});

  let [chooseFolder, setChooseFolder] = useState(false);
  let [open, setOpen] = useState(false);
  let [alert, setAlert] = useState(false);
  let [openModalFromSaved, setOpenModalFromSaved] = useState(false);

  // breakpoint framer motion
  const breakpoints = {
    mobile: 0,
    tablet: 768,
    dekstop: 1024,
  };

  const lebarLayar = window.innerWidth;

  const animateProps = {
    mobile: {
      height: "40vh",
    },
    tablet: {
      height: "30vh",
    },
    dekstop: {
      height: "100vh",
    },
  };
  // end breakpoints framer motion

  return (
    <MainContext.Provider
      value={{
        lastRead,
        setLastRead,
        chooseFolder,
        setChooseFolder,
        open,
        setOpen,
        breakpoints,
        lebarLayar,
        animateProps,
        alert,
        setAlert,
        openModalFromSaved,
        setOpenModalFromSaved,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const NewMainContext = () => {
  return useContext(MainContext);
};
