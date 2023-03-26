import ArrowLeft from "/images/arrow-left.png";
import Book from "/images/quran.png";
import Bismillah from "/images/bismillah.png";
import Close from "/images/close.png";
import Bookmark from "/images/bookmark.png";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { SkeletonDetails } from "../components/Skeleton";
import { motion } from "framer-motion";
import BottomNavbar from "../components/BottomNavbar";
import { ButtonForGoTop } from "../components/Button";

const Surah = () => {
  let [data, setData] = useState([]);
  let [ayat, setAyat] = useState([]);
  let { id } = useParams();
  let [loading, setLoading] = useState(true);
  let [open, setOpen] = useState(false);
  let [loncatAyat, setLoncatAyat] = useState("");

  useEffect(() => {
    fetch(`https://equran.id/api/v2/surat/${id}`)
      .then((response) => response.json())
      .then((finalData) => setData(finalData.data))
      .finally(() => setLoading(false));

    fetch(`https://equran.id/api/v2/surat/${id}`)
      .then((response) => response.json())
      .then((finalData) => setAyat(finalData.data.ayat))
      .finally(() => setLoading(false));
  }, []);

  let loncatAyatHandler = (even) => {
    setLoncatAyat(even.target.value);
    console.log(loncatAyat);
  };

  return (
    <>
      {/* <a href="#7" className="pt-32 text-black">asdajksdhaksjdhaksjd</a> */}

      {/* modal */}
      <motion.div
        className="w-full z-50 fixed bottom-0 bg-[#EAF2EF] "
        animate={
          open
            ? {
                height: "50vh",
                overflow: "hidden",
              }
            : {
                height: 0,
                overflow: "hidden",
              }
        }
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
          <img
            onClick={() => setOpen(false)}
            src={Close}
            alt=""
            className="absolute right-0 top-0 p-3 scale-50"
          />
          <div className="px-5 py-16 flex flex-col gap-5">
            <div className="bg-white rounded py-3 px-3 flex justify-start items-center gap-3">
              <img src={Bookmark} alt="" className="scale-125" />
              <h1 className="text-primary-blue font-medium">Simpan Ayat ini</h1>
            </div>
            <div className="bg-white rounded py-3 px-3 flex justify-start items-center gap-3">
              <img src={Bookmark} alt="" className="scale-125" />
              <h1 className="text-primary-blue font-medium">Simpan Ayat ini</h1>
            </div>
            <div className="bg-white rounded py-3 px-3 flex justify-start items-center gap-3">
              <img src={Bookmark} alt="" className="scale-125" />
              <h1 className="text-primary-blue font-medium">Simpan Ayat ini</h1>
            </div>
          </div>
        </div>
      </motion.div>

      <section id="top" className={open ? "opacity-50" : "opacity-100"}>
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
                  <a href={"#"+loncatAyat} className="text-white py-2 px-5 rounded bg-biru-tua dark:bg-biru-muda">
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
                      onClick={() => setOpen(true)}
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
      <div className="fixed z-50 bottom-24 left-5">
        <ButtonForGoTop />
      </div>
      <BottomNavbar />
    </>
  );
};

export default Surah;
