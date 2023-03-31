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
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { ModalConfirm } from "./Modal";

const MenuDotThree = (props) => {
  let [isOpenMenu, setIsOpenMenu] = useState(false);
  let {
    isDeleteFolder,
    setIsDeleteFolder,
    openConfirm,
    setOpenConfirm,
    confirm,
    setConfirm,
  } = NewMainContext();

  let MenuHandler = () => {
    isOpenMenu ? setIsOpenMenu(false) : setIsOpenMenu(true);
  };

  console.log("ad22222", confirm);

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

  // if (confirm == true && props.list == props.list) {
  //   deleteFolderHandler();
  // }

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
        className="bg-[#3B185F] z-40 rounded-lg"
      >
        <div className="flex flex-col gap-5">
          <motion.div
            onClick={deleteFolderHandler}
            // onClick={() => setOpenConfirm(true)}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2"
          >
            <AiOutlineDelete className="text-white text-[1.5rem]" />
            <h1 className="text-white">Hapus</h1>
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2"
          >
            <BiRename className="text-white text-[1.5rem]" />
            <h1 className="text-white">Ubah Nama</h1>
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
