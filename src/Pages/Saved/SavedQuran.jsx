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
import MenuDotThree from "../../components/MenuDotThree";
import { NewMainContext } from "../../context/MainContext";
import { ModalUpdateFolder } from "../../components/Modal";

const SavedQuran = () => {
  let [saved, setSaved] = useState([]);
  let [loading, setLoading] = useState(true);
  let [isOpen, setIsOpen] = useState(false);
  let dataInputFolderRef = useRef();
  
  let {
    isDeleteFolder,
    openConfirm,
    setOpenConfirm,
    setIsDeleteFolder,
    updateFolderModal,
    setUpdateFolderModal,
    dataIdFolder,
    setDataIdFolder,
  } = NewMainContext();
  let { user } = UserAuth();

  useEffect(() => {
    let collectionRef = collection(db, "folder");
    // let collectionQuran = collection(db, "saved");
    let queryRefCollectionQuran = query(
      collectionRef,
      where("list", "==", "alquran"),
      where("user", "==", user.sub, "&&")
    );

    getDocs(queryRefCollectionQuran).then((response) => {
      let arr = [];
      response.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setSaved(arr);
      setLoading(false);
    });

    setTimeout(() => {
      setIsDeleteFolder(false);
    }, 500);
  }, [isOpen, isDeleteFolder, updateFolderModal]);

  let submitFolder = (even) => {
    even.preventDefault();
    addDoc(collection(db, "folder"), {
      folderName: dataInputFolderRef.current.value,
      list: "alquran",
      user: user.sub,
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* modal add folder*/}

      {isOpen === true ? (
        <motion.div
          className="w-[80%] md:w-[40%] lg:w-[40%] lg:top-32 left-1/2 -translate-x-1/2 mx-auto z-[60] fixed top-20 bg-[#EAF2EF] rounded-lg"
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

      {/* modal untuk update folder */}
      {updateFolderModal === true ? <ModalUpdateFolder /> : ""}

      <div className="fixed top-0 left-0 w-full z-20">
        <Navbar
          imgLeft={"/images/arrow-left.png"}
          appbarName={"Al Quran"}
          linkTo={"/saved"}
        />
      </div>
      <section
        className="pt-20 md:pt-20 pb-28 lg:w-[50%] md:w-[60%] md:ml-10 lg:ml-0"
      >
        <div className={
          isOpen || updateFolderModal
            ? "blur-sm brightness-50 h-screen w-screen bg-black fixed z-30 bg-opacity-40 left-0 top-0"
            : "blur-none z-30 relative"
        }></div>
        <div className="">
          <div
            onClick={() => setIsOpen(true)}
            className="flex justify-start items-center gap-3 mx-3 mb-5 px-3 bg-biru-muda py-3 rounded cursor-pointer"
          >
            <FiFolderPlus className="text-[2rem] text-biru-terang" />
            <p className="text-primary-blue font-semibold text-lg">
              Tambah Folder Baru
            </p>
          </div>
          <div className="px-3 pb-3">
            <h1 className="text-primary-blue font-medium dark:text-white">
              <span className="font-bold">Note:</span> Menghapus folder akan
              menghapus juga data di dalamnya
            </h1>
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
                    key={row.id}
                    onClick={() => setDataIdFolder(row.id)}
                    // whileHover={{ scale: 1.1 }}
                    // whileTap={{ scale: 0.9 }}
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    className="bg-white relative dark:bg-[#2B303B] flex items-center justify-between mx-3 pr-2"
                  >
                    <Link
                      to={`/saved/alquran/${row.id}`}
                      className="flex w-full h-full rounded px-5 py-3 justify-between items-center gap-3 dark:bg-[#2B303B]"
                    >
                      <div className="flex justify-start items-center gap-5 w-full ">
                        <FiFolder className="text-[2rem] text-biru-terang" />
                        <div className="">
                          {/* {(updateFolderModal)} */}
                          <p className="text-primary-blue dark:text-white font-medium text-lg">
                            {row.folderName}
                          </p>
                          {/* <p className="text-light-gray">{saved.length} Item</p> */}
                        </div>
                      </div>
                    </Link>
                    <div className="cursor-pointer">
                    <MenuDotThree
                      // idFolder={row.id}
                      idFolder={dataIdFolder}
                      folderName={row.folderName}
                      list={"alquran"}
                    />
                    </div>
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

export default SavedQuran;
