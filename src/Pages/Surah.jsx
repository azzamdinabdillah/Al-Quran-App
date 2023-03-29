import ArrowLeft from "/images/arrow-left.png";
import Book from "/images/quran.png";
import Bismillah from "/images/bismillah.png";
import Bookmark from "/images/bookmark.png";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { SkeletonDetails } from "../components/Skeleton";
import { motion } from "framer-motion";
import { ButtonForGoTop, ButtonPrimaryA } from "../components/Button";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Alert from "../components/Alert";
import { NewMainContext } from "../context/SuratContext";
import { FiFolder } from "react-icons/fi";

const Surah = () => {
  let [data, setData] = useState([]);
  let [ayat, setAyat] = useState([]);
  let { namaSurat, id, ayatSaved } = useParams();
  let [loading, setLoading] = useState(true);
  let [open, setOpen] = useState(false);
  let [loncatAyat, setLoncatAyat] = useState("");
  let [savedAyat, setSavedAyat] = useState("");
  let [alert, setAlert] = useState(false);
  let { lastRead, setLastRead } = NewMainContext();
  let [folder, setFolder] = useState([]);
  let [chooseFolder, setChooseFolder] = useState(false);

  let [openModalFromSaved, setOpenModalFromSaved] = useState(false);

  // breakpoint framer motion
  const breakpoints = {
    mobile: 0,
    tablet: 768,
    dekstop: 1024,
  };

  const lebarLayar = window.innerWidth;

  const animateProps = {
    mobile: {
      height: "40vh",
    },
    tablet: {
      height: "30vh",
    },
    dekstop: {
      height: "100vh",
    },
  };
  // end breakpoints framer motion

  const navigasi = useNavigate();

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
    fetch(`https://equran.id/api/v2/surat/${id}`)
      .then((response) => response.json())
      .then((finalData) => setData(finalData.data))
      .finally(() => setLoading(false));

    fetch(`https://equran.id/api/v2/surat/${id}`)
      .then((response) => response.json())
      .then((finalData) => setAyat(finalData.data.ayat))
      .finally(() => setLoading(false));

    ayatSaved >= 1 ? setOpenModalFromSaved(true) : "";

    setTimeout(() => {
      setOpenModalFromSaved(false);
    }, 10000);

    let collectionRef = collection(db, "folder");

    getDocs(collectionRef).then((response) => {
      let arr = [];
      response.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setFolder(arr);
    });
  }, []);

  // console.log(openModalFromSaved);

  let loncatAyatHandler = (even) => {
    setLoncatAyat(even.target.value);
  };

  let savedHandler = async () => {
    await addDoc(collection(db, "saved"), {
      ayat: savedAyat,
      surat: namaSurat,
      idSurat: id,
      folder: "alquran",
    });
    if (addDoc) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 5000);
    } else {
      return alert("Gagal");
    }
  };
  // console.log(savedAyat);

  return (
    <>
      {/* modal from saved */}
      {openModalFromSaved === true ? (
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
                Lanjutkan Membaca?{" "}
              </h1>
              <div className="flex justify-center items-center gap-5 mt-5">
                <button
                  onClick={() => setOpenModalFromSaved(false)}
                  className="underline"
                >
                  Tidak
                </button>
                <div onClick={() => setOpenModalFromSaved(false)}>
                  <ButtonPrimaryA name={"Lanjutkan"} ayat={ayatSaved} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        ""
      )}

      {/* modal choose folder*/}
      {chooseFolder === true ? (
        <motion.div
          className="w-[80%] left-1/2 -translate-x-1/2 mx-auto z-[60] fixed top-20 bg-[#EAF2EF] rounded-lg"
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
                {folder.map((row) => (
                  <button
                    onClick={() => {
                      addDoc(collection(db, "saved"), {
                        ayat: savedAyat,
                        surat: namaSurat,
                        idSurat: id,
                        folder: row.folderName,
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
                ))}
              </div>
              <button
                onClick={() => setChooseFolder(false)}
                className="underline"
              >
                Batal
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        ""
      )}

      {/* modal */}
      <motion.div
        className="w-full md:w-[60%] rounded-t-3xl z-50 fixed bottom-0 md:left-1/2 md:-translate-x-1/2 bg-[#EAF2EF] "
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
          <div className="px-5 py-5 flex flex-col gap-5">
            <button
              onClick={() => setChooseFolder(true)}
              className="bg-white rounded py-3 px-3 flex justify-start items-center gap-3"
            >
              <BsFillBookmarkFill size={25} />
              <h1 className="text-primary-blue font-medium">Simpan Ayat ini</h1>
            </button>
            <button
              onClick={lastReadHandler}
              className="bg-white rounded py-3 px-3 flex justify-start items-center gap-3"
            >
              <AiOutlinePaperClip size={25} />
              <h1 className="text-primary-blue font-medium">
                Tandai Terakhir Baca
              </h1>
            </button>
          </div>
        </div>
      </motion.div>

      {alert ? <Alert message={"Berhasil ditambahkan"} /> : ""}

      <section
        onClick={() => {
          open ? setOpen(false) : "";
        }}
        id="top"
        className={
          open || openModalFromSaved
            ? "blur-sm z-30 brightness-75"
            : "blur-none z-30"
        }
      >
        <div className="">
          <Navbar
            linkTo={"/"}
            imgLeft={ArrowLeft}
            appbarName={data.namaLatin}
          />
        </div>
        <div className="px-3 pb-24 md:px-32 lg:px-96 pt-20 bg-[#EAF2EF] dark:bg-[#2F243A]">
          <div>
            {loading ? (
              <SkeletonDetails />
            ) : (
              <>
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-3"
                >
                  <div className="w-full overflow-hidden rounded-lg relative shadow-primary-blue bg-[#542E71]">
                    <div className="px-5 py-10">
                      <div className="">
                        <h1 className="font-medium text-white text-2xl text-center">
                          {data.namaLatin}
                        </h1>
                        <p className="text-center text-white mt-2">
                          {data.arti}
                        </p>

                        <hr className="w-[70%] mx-auto my-5" />

                        <p className="text-center text-white mt-2 font-medium text-lg">
                          {data.tempatTurun} - {data.jumlahAyat} ayat
                        </p>
                        <img src={Bismillah} alt="" className="mx-auto mt-5" />

                        {/* <audio src={data.audioFull['05']} className="mx-auto mt-5" controls></audio> */}
                      </div>
                    </div>
                    <img
                      src={Book}
                      alt=""
                      className="absolute bottom-5 right-10 opacity-10 scale-150"
                    />
                  </div>
                </motion.div>

                <div className="mt-5 flex justify-start items-center gap-2">
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
              </>
            )}

            {loading ? (
              <div>
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
                className=""
              >
                {ayat.map((row) => (
                  <div className="">
                    <div
                      id={row.nomorAyat}
                      onClick={() => {
                        setOpen(true);
                        setSavedAyat(row.nomorAyat);
                      }}
                      className="w-full hover:bg-opacity-70 bg-white dark:bg-[#2B303B] mt-3 py-7 px-5 rounded-md "
                    >
                      <div className="">
                        <div className="flex justify-between items-center">
                          {/* <div className="relative">
                            <img src={NoSurah} alt="" className="" />
                            <p className="text-dark-blue dark:text-white font-bold absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-xs">{row.nomorAyat}</p>
                        </div> */}
                          <p className="bg-[#403D58] dark:bg-[#5BC0EB] dark:text-black font-medium text-white px-3 py-1 rounded-md">
                            {row.nomorAyat}
                          </p>
                          <audio
                            controls
                            className="h-10 w-[80%] audioPlayer"
                            src={row.audio["05"]}
                          />
                          {/* <img
                          src={Audio}
                          onClick={handlePlay}
                          alt=""
                          className="scale-50"
                        /> */}
                        </div>
                        <p className="text-end font-arabic font-bold text-2xl leading-loose dark:text-white mt-5">
                          {row.teksArab}
                        </p>
                        <p className="text-end my-4 font-medium text-[#444054] italic text-sm dark:text-[#84A9C0]">
                          "{row.teksLatin}"
                        </p>
                      </div>
                      <p className="text-black font-medium text-[15px] leading-relaxed dark:text-white">
                        "{row.teksIndonesia}"
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>
      {/* button to top */}
      <div className="fixed z-40 bottom-24 left-5">
        <ButtonForGoTop />
      </div>
    </>
  );
};

export default Surah;
