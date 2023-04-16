import Navbar from "../../components/Navbar";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Skeleton from "../../components/Skeleton";
import { Link } from "react-router-dom";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../../context/AuthContext";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FiFolder, FiFolderPlus } from "react-icons/fi";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

const ListSaved = () => {

  const { googleSignIn, logOut, user, setUser } = UserAuth();

  // const handleGoogleSignIn = () => {
  //   try {
  //     googleSignIn();
  //   } catch (error) { 
  //     console.log(error);
  //   }
  // };

  // const handleLogOut = () => {
  //   try {
  //     logOut();
  //   } catch (error) {
  //     console.log("bentar bang error", error);
  //   }
  // }

  const newLoginGoogle = (response) => {
    let token = response.credential;
    let tokenDecoded = jwtDecode(token);
    setUser(tokenDecoded);
  }

  console.log("dataa usernya abanggg", user);

  return (
    <>
      <div className="fixed top-0 left-0 w-full">
        <Navbar
          imgLeft={"/images/arrow-left.png"}
          appbarName={"Bookmark List"}
          linkTo={"/"}
        />
      </div>
      <section className="pt-24 md:pt-24 pb-28 lg:w-[50%] md:w-[60%] md:ml-10 lg:ml-0">
        <div className="pb-5 flex justify-center">
          <GoogleLogin onSuccess={newLoginGoogle} onError={() => console.log("error bg")} auto_select="true" useOneTap />
        </div>
        <div className="">
        {user?.sub ? (
            <div className="flex flex-col gap-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              className=""
            >
              <Link
                to={`/saved/alquran/`}
                className="flex bg-white rounded mx-3 px-5 py-3 justify-between items-center gap-3 dark:bg-[#2B303B]"
              >
                <div className="flex justify-start items-center gap-5 w-full ">
                  <FiFolder className="text-[2rem] text-biru-terang" />
                  <div className="">
                    <p className="text-primary-blue dark:text-white font-medium text-lg">
                      Bookmark Al Quran
                    </p>
                    {/* <p className="text-light-gray">{saved.length} Item</p> */}
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              className=""
            >
              <Link
                to={`/saved/tafsir/`}
                className="flex bg-white rounded mx-3 px-5 py-3 justify-between items-center gap-3 dark:bg-[#2B303B]"
              >
                <div className="flex justify-start items-center gap-5 w-full ">
                  <FiFolder className="text-[2rem] text-biru-terang" />
                  <div className="">
                    <p className="text-primary-blue dark:text-white font-medium text-lg">
                      Bookmark Tafsir Quran
                    </p>
                    {/* <p className="text-light-gray">{saved.length} Item</p> */}
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>  
          ) : (
            <div className="">
              <h1 className="text-center font-medium text-biru-tua capitalize text-lg dark:text-biru-muda md:ml-5">silahkan login terlebih dahulu untuk menyimpan data anda</h1>
            </div>
          )}
          
        </div>
      </section>
    </>
  );
};

export default ListSaved;
