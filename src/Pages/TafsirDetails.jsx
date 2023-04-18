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
import { AiFillCloseCircle } from "react-icons/ai";
import { ButtonForGoTop } from "../components/Button";

const TafsirDetails = () => {
  let [data, setData] = useState([]);
  let [tafsir, setTafsir] = useState([]);
  let { namaSurat, id, tafsirSaved } = useParams();
  let [savedTafsir, setSavedTafsir] = useState("");
  let [loading, setLoading] = useState(true);
  let [expandText, setExpandText] = useState(false);
  let [loncatAyat, setLoncatAyat] = useState("");

  let [idPerRow, setIdPerRow] = useState();
  let [openModalBacaLengkap, setOpenModalBacaLengkap] = useState();
  let [dataBacaLengkap, setDataBacaLengkap] = useState();

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

  let loncatAyatHandler = (even) => {
    setLoncatAyat(even.target.value);
  };

  const NewExpandTextHandler = ({ DataidText }) => {
    let idRow = DataidText - 1;

    let data = tafsir[idRow].teks;
    // console.log(data);

    return (
      <motion.div
        className="text-base fixed left-1/2 md:left-[56%] -translate-x-1/2 top-[40%] md:top-[30%] -translate-y-1/2 bg-white z-50 rounded-lg leading-relaxed"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      >
        <div className="p-5 overflow-y-scroll h-[50vh] w-[90vw] md:w-[75vw]">
          {/* <div className="absolute -top-5 right-0 overflow-visible">
        <AiFillCloseCircle className="text-5xl text-primary-blue" />
      </div> */}
          <div>
            <h1 className="font-medium mb-1 text-lg text-primary-blue">
              Tafsir Lengkap :
            </h1>
            {data}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      {/* Modal untuk baca selengkapnya */}
      {openModalBacaLengkap ? (
        <NewExpandTextHandler DataidText={idPerRow} />
      ) : (
        ""
      )}

      {alert ? <Alert message={"Berhasil ditambahkan"} /> : ""}

      {/* modal choose folder*/}
      {chooseFolder === true ? (
        user?.sub ? (
          <ModalMenuFolder
            savedTafsir={savedTafsir}
            namaSurat={namaSurat}
            idTafsir={id}
            whereList={"tafsir"}
            user={user.sub}
          />
        ) : (
          <Alert message={"Silahkan Login Terlebih Dahulu"} />
        )
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
      <ModalMenu
        menu1={"Tafsir"}
        lastReadMenu="tafsir"
        namaSurat={namaSurat}
        savedSurat={savedTafsir}
        id={id}
      />

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
          openModalBacaLengkap ? setOpenModalBacaLengkap(false) : "";
        }}
        id="top"
      >
        {/* penggelap saat ada modal */}
        <div
          className={
            open || openModalFromSaved || chooseFolder || openModalBacaLengkap
              ? "blur-sm brightness-50 h-screen w-screen bg-black fixed z-30 bg-opacity-40 left-0 top-0 right-0 bottom-0"
              : "blur-none z-30 relative"
          }
        ></div>
        <div>
        <div className="md:mt-28 mt-24 w-[95%] md:w-[70%] mx-3 md:mx-auto flex justify-start items-center gap-2">
            <input
              onChange={loncatAyatHandler}
              placeholder={"Loncat Ke Ayat 1 - " + data.jumlahAyat}
              type="number"
              className="py-2 rounded text-black font-medium w-full px-5"
            />
            <a
              href={"#" + loncatAyat}
              className="text-white py-2 px-5 rounded bg-biru-tua dark:bg-biru-muda"
            >
              Loncat
            </a>
          </div>
          {loading ? (
            <SkeletonDetails />
          ) : (
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-3"
            ></motion.div>
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
              className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-3 mx-3 md:mx-10"
            >
              {tafsir.map((row) => (
                <div
                  id={row.ayat}
                  key={row.id}
                  // onClick={() => {
                  //   setOpen(true);
                  //   setSavedTafsir(row.ayat);
                  // }}
                  className="cursor-pointer group target:border-4 target:border-primary-blue"
                >
                  <div
                    className="w-full bg-white hover:bg-opacity-70 dark:bg-[#2B303B] mt-3 pt-7 px-5 rounded-t-md target:border-4 target:border-primary-blue"
                    onClick={() => {
                      setOpen(true);
                      setSavedTafsir(row.ayat);
                    }}
                  >
                    <div className="">
                      <div className="flex justify-between items-center">
                        <p className="bg-[#403D58] dark:bg-[#5BC0EB] dark:text-black font-medium text-white px-3 py-1 rounded-md">
                          {row.ayat}
                        </p>
                      </div>
                      <p className="text-start leading-relaxed text-base dark:text-white mt-3">
                        {row.teks.slice(0, 300) + " . . ."}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIdPerRow(row.ayat);
                      setOpenModalBacaLengkap(!openModalBacaLengkap);
                    }}
                    className="text-blue-400 underline cursor-pointer hover:no-underline bg-white block px-5 pb-7 pt-1 rounded-b-md group-hover:bg-opacity-70 w-full text-start"
                  >
                    {" "}
                    Baca Selengkapnya
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
      <BottomNavbar />
      <div className="fixed z-40 bottom-24 left-5">
        <ButtonForGoTop />
      </div>
    </>
  );
};

export default TafsirDetails;
