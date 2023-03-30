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

const SavedTafsir = () => {
  let [saved, setSaved] = useState([]);
  let [loading, setLoading] = useState(true);
  let [isOpen, setIsOpen] = useState(false);
  let dataInputFolderRef = useRef();

  useEffect(() => {
    let collectionRef = collection(db, "folder");
    // let collectionQuran = collection(db, "saved");
    let queryRefCollectionQuran = query(
      collectionRef,
      where("list", "==", "tafsir")
    );

    getDocs(queryRefCollectionQuran).then((response) => {
      let arr = [];
      response.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setSaved(arr);
      setLoading(false);
    });
  }, [isOpen]);

  const { googleSignIn } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  let submitFolder = (even) => {
    even.preventDefault();
    addDoc(collection(db, "folder"), {
      folderName: dataInputFolderRef.current.value,
      list: "tafsir",
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* modal choose folder*/}
      {isOpen === true ? (
        <motion.div
          className="w-[80%] left-1/2 -translate-x-1/2 mx-auto z-[60] fixed top-20 bg-[#EAF2EF] rounded-lg"
          animate={
            isOpen
              ? {
                  opacity: 1,
                  overflow: "hidden",
                }
              : {
                  opacity: 0,
                  overflow: "hidden",
                }
          }
          initial={
            isOpen
              ? {
                  opacity: 0,
                  overflow: "hidden",
                }
              : {
                  opacity: 0,
                  overflow: "hidden",
                }
          }
        >
          <div className="relative">
            <div className="px-5 py-10">
              <h1 className="text-center font-semibold text-xl">
                Tambah Folder
              </h1>
              <form onSubmit={submitFolder} className="">
                <input
                  ref={dataInputFolderRef}
                  type="text"
                  className="w-full px-3 py-3 mt-4 rounded"
                  placeholder="Masukkan Nama Folder"
                />
                <div className="flex justify-center items-center gap-5 mt-5">
                  <button onClick={() => setIsOpen(false)} className="">
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="text-white py-2 px-5 rounded bg-biru-tua dark:bg-biru-muda"
                  >
                    Tambah
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      ) : (
        ""
      )}

      <div className="md:ml-10">
        <Navbar
          imgLeft={"/images/arrow-left.png"}
          appbarName={"Tafsir"}
          linkTo={"/saved"}
        />
      </div>
      <section
        className={
          isOpen
            ? "blur-sm z-30 brightness-50 pt-24 pb-28"
            : "blur-none z-30 pt-24 pb-28 lg:w-[50%] md:w-[60%] md:ml-10"
        }
      >
        {/* <GoogleButton onClick={handleGoogleSignIn} /> */}
        <div className="">
          <div
            onClick={() => setIsOpen(true)}
            className="flex justify-start items-center gap-3 mx-3 mb-5 px-3 bg-biru-muda py-3 rounded"
          >
            <FiFolderPlus className="text-[2rem] text-biru-terang" />
            <p className="text-primary-blue font-semibold text-lg">
              Tambah Folder Baru
            </p>
          </div>
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
              {saved.length <= 0 ? (
                <h1 className="font-semibold text-primary-blue px-10 text-center mt-10">
                  Folder Kosong, Silahkan Buat Terlebih Dahulu
                </h1>
              ) : (
                saved.map((row) => (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    className=""
                  >
                    <Link
                      to={`/saved/tafsir/${row.folderName}`}
                      className="flex bg-white rounded mx-3 px-5 py-3 justify-between items-center gap-3 dark:bg-[#2B303B]"
                    >
                      <div className="flex justify-start items-center gap-5 w-full ">
                        <FiFolder className="text-[2rem] text-biru-terang" />
                        <div className="">
                          <p className="text-primary-blue dark:text-white font-medium text-lg">
                            {row.folderName}
                          </p>
                          {/* <p className="text-light-gray">{saved.length} Item</p> */}
                        </div>
                      </div>
                      <BiDotsVerticalRounded className="text-[2rem] text-primary-blue dark:text-biru-muda" />
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SavedTafsir;
