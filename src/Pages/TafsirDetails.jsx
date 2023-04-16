import { UserAuth } from "../context/AuthContext";
import ArrowLeft from "/images/arrow-left.png";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { SkeletonDetails } from "../components/Skeleton";
import { motion } from "framer-motion";
import BottomNavbar from "../components/BottomNavbar";
import {
  ModalFromSaved,
  ModalMenu,
  ModalMenuFolder,
} from "../components/Modal";
import { NewMainContext } from "../context/MainContext";
import Alert from "../components/Alert";

const TafsirDetails = () => {
  let [data, setData] = useState([]);
  let [tafsir, setTafsir] = useState([]);
  let { namaSurat, id, tafsirSaved } = useParams();
  let [savedTafsir, setSavedTafsir] = useState("");
  let [loading, setLoading] = useState(true);
  let {
    open,
    setOpen,
    chooseFolder,
    setChooseFolder,
    alert,
    setAlert,
    setOpenModalFromSaved,
    openModalFromSaved,
  } = NewMainContext();

  let { user } = UserAuth();

  const lastReadHandler = () => {
    // mendapatkan data dari localStorage
    let savedData = localStorage.getItem("savedData");

    // mengubah data string menjadi objek JSON
    savedData = savedData ? JSON.parse(savedData) : {};

    // menambahkan data baru ke objek savedData
    savedData.surat = namaSurat;
    savedData.ayat = savedAyat;
    savedData.idSurat = id;

    // menyimpan kembali data ke localStorage
    localStorage.setItem("savedData", JSON.stringify(savedData));

    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  };

  useEffect(() => {
    fetch(`https://equran.id/api/v2/tafsir/${id}`)
      .then((response) => response.json())
      .then((finalData) => setData(finalData.data))
      .finally(() => setLoading(false));

    fetch(`https://equran.id/api/v2/tafsir/${id}`)
      .then((response) => response.json())
      .then((finalData) => setTafsir(finalData.data.tafsir))
      .finally(() => setLoading(false));

    tafsirSaved >= 1 ? setOpenModalFromSaved(true) : "";

    setTimeout(() => {
      setOpenModalFromSaved(false);
    }, 10000);
  }, []);

  return (
    <>
      {alert ? <Alert message={"Berhasil ditambahkan"} /> : ""}

      {/* modal choose folder*/}
      {chooseFolder === true ? (
        (user?.sub) ? <ModalMenuFolder
        savedTafsir={savedTafsir}
        namaSurat={namaSurat}
        idTafsir={id}
        whereList={"tafsir"}
        user={user.sub}
      /> :
      <Alert message={"Silahkan Login Terlebih Dahulu"} />
      ) : (
        ""
      )}

      {/* modal from saved */}
      {openModalFromSaved === true ? (
        <ModalFromSaved linkList={tafsirSaved} />
      ) : (
        ""
      )}

      {/* modal bottom menu */}
      <ModalMenu menu1={"Tafsir"} lastReadMenu="tafsir" namaSurat={namaSurat} savedSurat={savedTafsir} id={id} />
      {/* <ModalMenu
        menu1={"Tafsir"}
        namaSurat={namaSurat}
        savedSurat={savedAyat}
        id={id}
        list="surah"
      /> */}

      <div className="">
        {loading ? (
          <div className="mx-10 my-10">
            <div className="bg-slate-200 w-full mt-3 py-2 rounded-full"></div>
          </div>
        ) : (
          <div className="fixed top-0 left-0 w-full">
            <Navbar
              linkTo={"/tafsir"}
              imgLeft={ArrowLeft}
              appbarName={data.namaLatin}
            />
          </div>
        )}
      </div>
      <section
        onClick={() => {
          open ? setOpen(false) : "";
          chooseFolder ? setChooseFolder(false) : "";
        }}
        id="top"
      >
        {/* penggelap saat ada modal */}
        <div className={
          open || openModalFromSaved || chooseFolder
            ? "blur-sm brightness-50 h-screen w-screen bg-black fixed z-30 bg-opacity-40 left-0 top-0"
            : "blur-none z-30 relative"
        }></div>
        <div>
          {loading ? (
            <SkeletonDetails />
          ) : (
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-3"
            >
              {/* <div className="w-full overflow-hidden rounded-lg relative shadow-primary-blue bg-[#542E71]">
                <div className="px-5 py-10">
                  <div className="">
                    <h1 className="font-medium text-white text-2xl text-center">
                      {data.namaLatin}
                    </h1>
                    <p className="text-center text-white mt-2">{data.arti}</p>

                    <hr className="w-[70%] mx-auto my-5" />

                    <p className="text-center text-white mt-2 font-medium text-lg">
                      {data.tempatTurun} - {data.jumlahAyat} ayat
                    </p>
                    <img src={Bismillah} alt="" className="mx-auto mt-5" />

                  </div>
                </div>
                <img
                  src={Book}
                  alt=""
                  className="absolute bottom-5 right-10 opacity-10 scale-150"
                />
              </div> */}
            </motion.div>
          )}

          {loading ? (
            <div>
              <SkeletonDetails />
              <SkeletonDetails />
              <SkeletonDetails />
              <SkeletonDetails />
              <SkeletonDetails />
              <SkeletonDetails />
            </div>
          ) : (
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="md:grid md:grid-cols-2 gap-x-3 mt-20 mx-3 md:mt-20 md:mx-10"
            >
              {tafsir.map((row) => (
                <div
                  id={row.ayat}
                  key={row.id}
                  onClick={() => {
                    setOpen(true);
                    setSavedTafsir(row.ayat);
                  }}
                  className=""
                >
                  <div className="w-full bg-white hover:bg-opacity-70 dark:bg-[#2B303B] mt-3 py-7 px-5 rounded-md target:border-4 target:border-primary-blue">
                    <div className="">
                      <div className="flex justify-between items-center">
                        <p className="bg-[#403D58] dark:bg-[#5BC0EB] dark:text-black font-medium text-white px-3 py-1 rounded-md">
                          {row.ayat}
                        </p>
                      </div>
                      <p className="text-start leading-relaxed text-base dark:text-white mt-3">
                        {row.teks}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
      <BottomNavbar />
    </>
  );
};

export default TafsirDetails;
