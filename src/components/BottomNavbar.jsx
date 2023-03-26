import { useState } from "react";
import { Link, NavLink, redirect, useNavigate } from "react-router-dom";
import Link1 from "/images/quran-bottom-2-2.png";
import Link2 from "/images/quran-bottom-1.png";
import Link3 from "/images/saved-bottom-3.png";

const BottomNavbar = () => {
  let [active, setActive] = useState(1);
  const navigasi = useNavigate();
  // console.log();

  return (
    <section
      style={{
        boxShadow: "1px -1px 10px -1px rgba(186,176,206,0.66)",
      }}
      className="w-full fixed bottom-0 bg-white dark:bg-[#2B303B] z-40"
    >
      <nav className="px-10 py-3">
        <div className="flex justify-between items-center">
          <NavLink
            to={"/"}
            className={
              active === 1
                ? "w-[13%] border-b-4 rounded pb-2 border-slate-500"
                : "w-[13%]"
            }
          >
            <div onClick={() => setActive(1)}>
              <img src={Link1} alt="" className="" />
            </div>
          </NavLink>

          <NavLink
            onClick={() => {
              setActive(2);
              redirect("/tafsir");
            }}
            to={"/tafsir"}
            className={
              active === 2
                ? "w-[13%] border-b-4 rounded pb-2 border-slate-500"
                : "w-[13%]"
            }
          >
            <div>
              <img src={Link2} alt="" className="" />
            </div>
          </NavLink>

          <NavLink
            to={"/saved"}
            className={
              active === 3
                ? "w-[13%] border-b-4 rounded pb-2 border-slate-500"
                : "w-[13%]"
            }
          >
            <div onClick={() => setActive(3)}>
              <img src={Link3} alt="" className="" />
            </div>
          </NavLink>

          {/* <Link className="w-[13%]">
            <img src="./images/quran-bottom-1.png" alt="" className="" />
          </Link> */}
        </div>
      </nav>
    </section>
  );
};

export default BottomNavbar;
