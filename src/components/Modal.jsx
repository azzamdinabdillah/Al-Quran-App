import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { FiFolder } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { NewMainContext } from "../context/MainContext";
import { db } from "../firebase";
import { ButtonPrimaryA } from "./Button";

export const ModalFromSaved = (props) => {
  let {
    open,
    setOpen,
    animateProps,
    lebarLayar,
    breakpoints,
    chooseFolder,
    setChooseFolder,
    alert,
    setAlert,
    openModalFromSaved,
    setOpenModalFromSaved,
  } = NewMainContext();

  let { namaSurat, id, tafsirSaved } = useParams();

  return (
    <motion.div
      className="w-[80%] left-1/2 -translate-x-1/2 mx-auto z-50 fixed top-1/2 -translate-y-1/2 bg-[#EAF2EF] rounded-lg"
      animate={
        openModalFromSaved
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
        openModalFromSaved
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
          <h1 className="text-center font-medium text-lg">
            Lanjutkan Membaca?
          </h1>
          <div className="flex justify-center items-center gap-5 mt-5">
            <button
              onClick={() => setOpenModalFromSaved(false)}
              className="underline"
            >
              Tidak
            </button>
            <div onClick={() => setOpenModalFromSaved(false)}>
              <ButtonPrimaryA name={"Lanjutkan"} ayat={props.linkList} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ModalMenuFolder = (props) => {
  let {
    open,
    setOpen,
    animateProps,
    lebarLayar,
    breakpoints,
    chooseFolder,
    setChooseFolder,
    alert,
    setAlert,
  } = NewMainContext();

  let [folder, setFolder] = useState([]);

  useEffect(() => {
    let collectionRef = collection(db, "folder");
    let queryCollection = query(
      collectionRef,
      where("list", "==", props.whereList),
      where("user", "==", props.user, "&&")
    );

    getDocs(queryCollection).then((response) => {
      let arr = [];
      response.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setFolder(arr);
    });
  });

  return (
    <motion.div
      className="w-[80%] md:w-[50%] left-1/2 -translate-x-1/2 mx-auto z-[60] fixed top-20 bg-[#EAF2EF] rounded-lg"
      animate={
        chooseFolder
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
        chooseFolder
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
          <h1 className="text-center font-medium text-lg">Pilih Folder</h1>
          <div className="px-1 py-5 flex flex-col gap-5">
            {folder.length <= 0 ? (
              <h1 className="font-semibold text-primary-blue px-10 text-center">
                Folder Kosong, Silahkan Buat Terlebih Dahulu
              </h1>
            ) : (
              folder.map((row) => (
                <button
                  onClick={() => {
                    addDoc(collection(db, "saved"), {
                      ayat: props.savedTafsir,
                      surat: props.namaSurat,
                      idSurat: props.idTafsir,
                      folder: row.id,
                      list: props.whereList,
                      user: props.user
                    });
                    if (addDoc) {
                      setAlert(true);
                      setTimeout(() => {
                        setAlert(false);
                      }, 5000);
                      setChooseFolder(false);
                    } else {
                      return alert("Gagal");
                    }
                  }}
                  className="bg-white rounded py-3 px-3 flex justify-start items-center gap-3"
                >
                  <FiFolder size={25} />
                  <h1 className="text-primary-blue font-medium">
                    {row.folderName}
                  </h1>
                </button>
              ))
            )}
          </div>
          <button onClick={() => setChooseFolder(false)} className="">
            Batal
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const ModalMenu = (props) => {
  let {
    open,
    setOpen,
    animateProps,
    lebarLayar,
    breakpoints,
    setChooseFolder,
    alert,
    setAlert,
  } = NewMainContext();

  const lastReadHandler = () => {
    // mendapatkan data dari localStorage
    let savedData = localStorage.getItem("savedData");

    // mengubah data string menjadi objek JSON
    savedData = savedData ? JSON.parse(savedData) : {};

    // menambahkan data baru ke objek savedData
    savedData.surat = props.namaSurat;
    savedData.ayat = props.savedSurat;
    savedData.idSurat = props.id;

    // menyimpan kembali data ke localStorage
    localStorage.setItem("savedData", JSON.stringify(savedData));

    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  };

  const lastReadHandlerTafsir = () => {
    // mendapatkan data dari localStorage
    let savedDataTafsir = localStorage.getItem("savedDataTafsir");

    // mengubah data string menjadi objek JSON
    savedDataTafsir = savedDataTafsir ? JSON.parse(savedDataTafsir) : {};

    // menambahkan data baru ke objek savedDataTafsir
    savedDataTafsir.surat = props.namaSurat;
    savedDataTafsir.tafsir = props.savedSurat;
    savedDataTafsir.idSurat = props.id;

    // menyimpan kembali data ke localStorage
    localStorage.setItem("savedDataTafsir", JSON.stringify(savedDataTafsir));

    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  };

  {
    /* modal */
  }
  return (
    <motion.div
      className="w-full md:w-[50%] rounded-t-3xl z-50 fixed bottom-0 md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 bg-[#EAF2EF] md:rounded-lg"
      animate={
        open
          ? lebarLayar >= 768 && lebarLayar <= 1024
            ? animateProps.tablet
            : animateProps.mobile
          : {
              height: 0,
            }
      }
      layout
      variants={breakpoints}
      initial={
        open
          ? {
              height: 0,
              overflow: "hidden",
            }
          : {
              height: 0,
              overflow: "hidden",
            }
      }
    >
      <div className="relative">
        {/* <img
        onClick={() => setOpen(false)}
        src={Close}
        alt=""
        className="absolute right-0 top-0 p-3 scale-50"
      /> */}
        <div className="px-5 md:p-8 py-5 flex flex-col gap-5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setChooseFolder(true);
              setOpen(false);
            }}
            className="bg-white rounded py-3 px-3 flex justify-start items-center gap-3"
          >
            <BsFillBookmarkFill size={25} />
            <h1 className="text-primary-blue font-medium">
              Simpan {props.menu1} ini
            </h1>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={
              props.lastReadMenu == "tafsir"
                ? lastReadHandlerTafsir
                : lastReadHandler
            }
            className="bg-white rounded py-3 px-3 flex justify-start items-center gap-3"
          >
            <AiOutlinePaperClip size={25} />
            <h1 className="text-primary-blue font-medium">
              Tandai Terakhir Baca
            </h1>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export const ModalConfirm = () => {
  let { openConfirm, setOpenConfirm, confirm, setConfirm } = NewMainContext();

  return (
    <motion.div
      className="w-[80%] left-1/2 -translate-x-1/2 mx-auto z-50 fixed top-1/2 -translate-y-1/2 bg-[#EAF2EF] rounded-lg shadow-2xl"
      animate={
        openConfirm
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
        openConfirm
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
          <h1 className="text-center font-medium text-lg">
            Menghapus folder akan otomatis menghapus data di dalamnya, yakin?
          </h1>
          <div className="flex justify-center items-center gap-5 mt-5">
            <button onClick={() => setOpenConfirm(false)} className="">
              Tidak
            </button>
            <div onClick={() => setOpenConfirm(false)}>
              {/* <ButtonPrimaryA name={"Hapus"} /> */}
              <button
                onClick={() => setConfirm(true)}
                className="bg-primary-blue text-white py-3 px-5 rounded-lg"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ModalUpdateFolder = (props) => {
  let { updateFolderModal, setUpdateFolderModal, dataIdFolder, setDataIdFolder } = NewMainContext();
  let [dataValueUpdateFolder, setDataValueUpdateFolder] = useState("");

  let dataInputUpdateFolderRef = useRef();

  let updateFolderHandler = (even) => {
    even.preventDefault();
    updateDoc(doc(db, "folder", dataIdFolder), {
      folderName: dataInputUpdateFolderRef.current.value,
    });
    setUpdateFolderModal(false);
  };

  useEffect(() => {
    getDoc(doc(db, "folder", dataIdFolder)).then((response) => setDataValueUpdateFolder(response.data().folderName));
  }, [])

  return (
    <motion.div
      className="w-[80%] left-1/2 -translate-x-1/2 mx-auto z-[60] fixed top-20 bg-[#EAF2EF] rounded-lg"
      animate={
        updateFolderModal
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
        updateFolderModal
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
            Tambah Folderasdasd
          </h1>
          <form onSubmit={updateFolderHandler} className="">
            <input
            autoFocus={true}
              ref={dataInputUpdateFolderRef}
              type="text"
              defaultValue={dataValueUpdateFolder}
              className="w-full px-3 py-3 mt-4 rounded"
              placeholder="Masukkan Nama Folder"
            />
            <div className="flex justify-center items-center gap-5 mt-5">
              <button onClick={() => setUpdateFolderModal(false)} className="">
                Batal
              </button>
              <button
                // type="submit"
                // onClick={updateFolderHandler}
                className="text-white py-2 px-5 rounded bg-biru-tua dark:bg-biru-muda"
              >
                Tambah
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};
