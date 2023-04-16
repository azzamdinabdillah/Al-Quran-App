import { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { motion } from "framer-motion";
import { NewMainContext } from "../context/MainContext";
import { AiOutlineDelete } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { ModalConfirm, ModalUpdateFolder } from "./Modal";

export const MenuDotThreeDetailsSaved = (props) => {
  let [isOpenMenu, setIsOpenMenu] = useState(false);
  let { deleteSavedDetails, setDeleteSavedDetails } = NewMainContext();
  let deleteFolderHandler = async () => {
    deleteDoc(doc(db, "saved", props.idSaved));
    setDeleteSavedDetails(true);
  };

  let MenuHandler = () => {
    isOpenMenu ? setIsOpenMenu(false) : setIsOpenMenu(true);
  };

  return (
    <div className="">
      <motion.div
        animate={
          isOpenMenu
            ? {
                opacity: 1,
                padding: "20px",
                overflow: "hidden",
                position: "absolute",
                top: "3rem",
                right: "0rem",
              }
            : {
                opacity: 0,
                overflow: "hidden",
                display: "none",
              }
        }
        initial={
          isOpenMenu
            ? {
                opacity: 0,
                overflow: "hidden",
              }
            : {
                opacity: 0,
                overflow: "hidden",
              }
        }
        className="bg-[#3B185F] z-40 rounded-lg dark:bg-biru-muda"
      >
        <div className="flex flex-col gap-5">
          <motion.div
            onClick={deleteFolderHandler}
            // onClick={() => setOpenConfirm(true)}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2"
          >
            <AiOutlineDelete className="text-white dark:text-primary-blue dark:font-medium text-[1.5rem]" />
            <h1 className="text-white dark:text-primary-blue dark:font-medium">Hapus</h1>
          </motion.div>
        </div>
      </motion.div>
      <BiDotsVerticalRounded
        onClick={MenuHandler}
        className="text-[2rem] text-primary-blue dark:text-biru-muda"
      />
    </div>
  );
};

const MenuDotThree = (props) => {
  let [isOpenMenu, setIsOpenMenu] = useState(false);
  let {
    isDeleteFolder,
    setIsDeleteFolder,
    openConfirm,
    setOpenConfirm,
    confirm,
    setConfirm,
    updateFolderModal,
    setUpdateFolderModal,
  } = NewMainContext();

  let MenuHandler = () => {
    isOpenMenu ? setIsOpenMenu(false) : setIsOpenMenu(true);
  };

  let deleteFolderHandler = async () => {
    deleteDoc(doc(db, "folder", props.idFolder));

    const dataSavedInsideFolder = query(
      collection(db, "saved"),
      where("folder", "==", props.folderName),
      where("list", "==", props.list, "&&")
    );

    try {
      let snapShoot = await getDocs(dataSavedInsideFolder);
      snapShoot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
      setIsDeleteFolder(true);
    } catch (error) {
      console.log("error bang, bentarrr", error);
    }
  };

  // let updateFolderHandler = (even) => {
  //   even.preventDefault();
  //   updateDoc(doc(db, "folder", props.idFolder), {
  //     folderName: "test2",
  //   });
  //   setUpdateFolderModal(false);
  // };

  // console.log("idfolder",props.idFolder);

  return (
    <div className="">
      {/* {openConfirm ? <ModalConfirm /> : ""} */}

      <motion.div
        animate={
          isOpenMenu
            ? {
                opacity: 1,
                padding: "20px",
                overflow: "hidden",
                position: "absolute",
                top: "3rem",
                right: "0rem",
              }
            : {
                opacity: 0,
                overflow: "hidden",
                display: "none",
              }
        }
        initial={
          isOpenMenu
            ? {
                opacity: 0,
                overflow: "hidden",
              }
            : {
                opacity: 0,
                overflow: "hidden",
              }
        }
        className="bg-[#3B185F] z-40 rounded-lg dark:bg-biru-muda"
      >
        <div className="flex flex-col gap-5">
          <motion.div
            onClick={deleteFolderHandler}
            // onClick={() => setOpenConfirm(true)}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2"
          >
            <AiOutlineDelete className="text-white dark:text-primary-blue dark:font-medium text-[1.5rem]" />
            <h1 className="text-white dark:text-primary-blue dark:font-medium cursor-pointer">Hapus</h1>
          </motion.div>
          <motion.div
            onClick={() => setUpdateFolderModal(true)}
            // onClick={updateFolderHandler}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2"
          >
            <BiRename className="text-white dark:text-primary-blue dark:font-medium text-[1.5rem]" />
            <h1 className="text-white dark:text-primary-blue dark:font-medium cursor-pointer">Ubah Nama</h1>
          </motion.div>
        </div>
      </motion.div>
      <BiDotsVerticalRounded
        onClick={MenuHandler}
        className="text-[2rem] text-primary-blue dark:text-biru-muda"
      />
    </div>
  );
};

export default MenuDotThree;
