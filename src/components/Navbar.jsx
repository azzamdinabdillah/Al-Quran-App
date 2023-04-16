import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LightIcon from "/images/light.png";
import DarkIcon from "/images/dark.png";
import Search from "/images/search.png";

const Navbar = (props) => {
  let [dark, setDark] = useState(false);
  let [darkModeLocal, setDarkModeLocal] = useState();

  let darkModeHandler = () => {
    setDark(!dark);

    let darkModeLocal = localStorage.getItem("darkMode");
    darkModeLocal = darkModeLocal ? JSON.parse(darkModeLocal) : {};

    darkModeLocal = dark;

    localStorage.setItem("darkMode", JSON.stringify(darkModeLocal));
  }

  useEffect(() => {

    let dataDarkMode = JSON.parse(localStorage.getItem("darkMode"));

    if (dataDarkMode === null) {
      let dataDarkModeInLocal = localStorage.setItem("darkMode", false);
      setDarkModeLocal(dataDarkModeInLocal);
    }

    if (dataDarkMode) {
      document.querySelector(".darkClassPlace").classList.add("dark");
      setDarkModeLocal(true);
    } else {
      document.querySelector(".darkClassPlace").classList.remove("dark");
      setDarkModeLocal(false);
    }

    // console.log("datane bang",dataDarkMode);
  }, [dark]);


  return (
    <div className="fixed md:relative z-20 w-full bg-[#EAF2EF] dark:bg-[#2F243A] px-5 py-2 top-0">
      <div className="flex justify-between md:justify-start items-center md:pl-[10rem] lg:pl-[13rem]">
        <div className="flex justify-start items-center gap-5">
          <Link to={props.linkTo}>
            <img src={props.imgLeft} alt="" />
          </Link>
          <h1 className="text-primary-blue dark:text-white font-bold text-2xl">
            {props.appbarName}
          </h1>
        </div>
        <div className="flex justify-start items-center">
          <img
            onClick={darkModeHandler}
            src={darkModeLocal ? LightIcon : DarkIcon}
            alt=""
            className="scale-50 toggleDark"
          />
          {/* <img src={Search} alt="" /> */}
        </div>
      </div>
    </div>
  );
};


export default Navbar;
