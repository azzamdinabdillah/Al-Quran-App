import ArrowLeft from "/images/arrow-left.png";
import Book from "/images/quran.png";
import Bismillah from "/images/bismillah.png";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { SkeletonDetails } from "../components/Skeleton";
import { motion } from "framer-motion";
import BottomNavbar from "../components/BottomNavbar";

const TafsirDetails = () => {
  let [data, setData] = useState([]);
  let [tafsir, setTafsir] = useState([]);
  let { id } = useParams();
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://equran.id/api/v2/tafsir/${id}`)
      .then((response) => response.json())
      .then((finalData) => setData(finalData.data))
      .finally(() => setLoading(false));

    fetch(`https://equran.id/api/v2/tafsir/${id}`)
      .then((response) => response.json())
      .then((finalData) => setTafsir(finalData.data.tafsir))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="">
        {loading ? (
            <div className="mx-10 my-10">
                <div className="bg-slate-200 w-full mt-3 py-2 rounded-full"></div>
            </div>
        ) : (
            <div className="pb-10">
                <Navbar
                  linkTo={"/"}
                  imgLeft={ArrowLeft}
                  appbarName={data.namaLatin}
                />
            </div>
        )}
      </div>
      <section className="px-3 pb-5 md:px-20 pt-10 bg-[#EAF2EF] dark:bg-[#2F243A]">
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
              className="md:grid md:grid-cols-2 gap-x-3"
            >
              {tafsir.map((row) => (
                <div className="">
                  <div className="w-full bg-white dark:bg-[#2B303B] mt-3 py-7 px-5 rounded-md ">
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
        <BottomNavbar/>
    </>
  );
};

export default TafsirDetails;
