import { useEffect, useState } from "react";
import { Link, NavLink, redirect, useNavigate } from "react-router-dom";
import { FaQuran } from "react-icons/fa";
import { GiWhiteBook } from "react-icons/gi";
import { BsFillBookmarkFill } from "react-icons/bs";

const BottomNavbar = () => {
  let [active, setActive] = useState(null);
  const navigasi = useNavigate();
  console.log(active);

  // useEffect(() => {
  //   if (active == 1) {
  //     navigasi("/");
  //   } else if (active == 2) {
  //     navigasi("/tafsir");
  //   } else if (active == 3) {
  //     navigasi("/saved");
  //   }
  // }, [active]);

  return (
    <section
      style={{
        boxShadow: "1px -1px 10px -1px rgba(186,176,206,0.66)",
      }}
      className="w-full fixed bottom-0 md:w-[15%] lg:w-[10%] md:top-0 md:left-0 bg-white md:shadow-none dark:bg-[#2B303B] z-40"
    >
      <nav className="px-10 md:px-4 py-3 md:py-5">
        <h1 className="text-xl font-semibold hidden md:block dark:text-white">
          Menu
        </h1>
        <div className="flex md:flex-col md:justify-center md:items-center justify-between items-center md:mt-10 md:gap-10">
          <Link
            onClick={() => setActive(1)}
            to={"/"}
            // className={
            //   active == 1
            //     ? "md:w-full border-b-4 rounded pb-2 border-slate-500"
            //     : "md:w-full"
            // }
          >
            <div className="w-full">
              <div className="w-full">
                <FaQuran className="text-primary-blue dark:text-biru-muda mx-auto text-[2rem]" />
                <h1 className="w-full text-sm mt-2 text-light-gray font-medium">
                  Al-Quran
                </h1>
              </div>
            </div>
          </Link>

          <Link
            onClick={() => setActive(2)}
            to={"/tafsir"}
            // className={
            //   active == 2
            //     ? "md:w-full border-b-4 rounded pb-2 border-slate-500"
            //     : "md:w-full"
            // }
          >
            <div>
              <div className="w-full">
                <GiWhiteBook className="text-primary-blue dark:text-biru-muda mx-auto text-[2rem]" />
                <h1 className="w-full text-sm mt-2 text-light-gray font-medium">
                  Tafsir
                </h1>
              </div>
            </div>
          </Link>

          <Link
            onClick={() => setActive(3)}
            to={"/saved"}
            // className={
            //   active == 3
            //     ? "md:w-full border-b-4 rounded pb-2 border-slate-500"
            //     : "md:w-full"
            // }
          >
            <div>
              <div className="w-full">
                <BsFillBookmarkFill className="text-primary-blue dark:text-biru-muda mx-auto text-[2rem]" />
                <h1 className="w-full text-sm mt-2 text-light-gray font-medium">
                  Bookmark
                </h1>
              </div>
            </div>
          </Link>

          {/* <Link className="w-[13%] md:w-full">
            <img src="./images/quran-bottom-1.png" alt="" className="" />
          </Link> */}
        </div>
      </nav>
    </section>
  );
};

export default BottomNavbar;
