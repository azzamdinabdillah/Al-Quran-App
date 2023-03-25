import ArrowLeft from "/images/arrow-left.png";
import Book from "/images/quran.png";
import Bismillah from "/images/bismillah.png";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { SkeletonDetails } from "../components/Skeleton";
import { motion } from "framer-motion";

const Surah = () => {
  let [data, setData] = useState([]);
  let [ayat, setAyat] = useState([]);
  let { id } = useParams();
  let [loading, setLoading] = useState(true);

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

  // let [status, setStatus] = useState(false);

  // useEffect(() => {
  //     if (document.querySelector(".darkClassPlace").classList.contains("dark")) {
  //         setStatus(true);
  //     }else{
  //         setStatus(false)
  //     }
  // }, [status])

  // console.log(status);

  return (
    <>
      <div className="">
        <Navbar linkTo={"/"} imgLeft={ArrowLeft} appbarName={data.namaLatin} />
      </div>
      <section className="px-3 pb-5 md:px-20 pt-20 bg-[#EAF2EF] dark:bg-[#2F243A]">
        <div>
          {loading ? (
            <SkeletonDetails />
          ) : (
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration:0.5 }}
              className="mt-3"
            >
              <div className="w-full overflow-hidden rounded-lg relative shadow-primary-blue bg-[#542E71]">
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
              transition={{ duration:0.5 }}
              className="md:grid md:grid-cols-2 gap-x-3"
            >
              {ayat.map((row) => (
                <div className="">
                  <div className="w-full bg-white dark:bg-[#2B303B] mt-3 py-7 px-5 rounded-md ">
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
      </section>
    </>
  );
};

export default Surah;
