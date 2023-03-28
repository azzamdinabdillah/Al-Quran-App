import BottomNavbar from "../components/BottomNavbar";
import Navbar from "../components/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Skeleton from "../components/Skeleton";
import { Link } from "react-router-dom";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { async } from "@firebase/util";

const Saved = () => {
  let [saved, setSaved] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, "saved")).then((response) => {
      let arr = [];
      response.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setSaved(arr);
      setLoading(false);
    });
  }, []);


  const { googleSignIn } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar imgLeft={"./images/arrow-left.png"} appbarName={"Bookmark"} />
      <section className="pt-24 pb-28">
        <GoogleButton onClick={handleGoogleSignIn} />
        <div>
          {/* <div className="flex justify-start items-center gap-3">
            <img src="./images/add-saved.png" alt="" className="w-[10%]" />
            <p className="text-primary-blue font-semibold text-lg">
              Tambah Folder Simpanan Baru
            </p>
          </div> */}
          {loading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <div className="flex flex-col gap-3">
              {saved.map((row) => (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  className=""
                >
                  <Link to={`/surah/${row.surat}/${row.idSurat}/${row.ayat}`} className="flex bg-white rounded mx-3 p-3 justify-between items-center gap-3 dark:bg-[#2B303B]">
                    <div className="flex justify-start items-center gap-5 w-full ">
                      <div className="relative inline-block">
                        <img src="./images/nomer-surat.png" alt="" />
                        <p className="text-dark-blue dark:text-white font-bold absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-xs">
                          {row.ayat}
                        </p>
                      </div>
                      <div className="">
                        <p className="text-primary-blue dark:text-white font-medium">
                          Surat {row.surat}
                        </p>
                        <p className="text-light-gray">
                          Ayat ke {row.ayat} Surat ke {row.idSurat}
                        </p>
                      </div>
                    </div>
                    <img src="./images/menu-saved.png" alt="" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Saved;
