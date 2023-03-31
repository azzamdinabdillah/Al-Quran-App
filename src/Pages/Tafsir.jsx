import BottomNavbar from "../components/BottomNavbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Skeleton from "../components/Skeleton";
import Quran from "/images/quran.png";

const Tafsir = () => {
  let [surat, setSurat] = useState([]);
  let [loading, setLoading] = useState(true);
  // let [lastRead]

  useEffect(() => {
    fetch("https://equran.id/api/v2/surat")
      .then((response) => response.json())
      .then((data) => setSurat(data.data))
      .finally(() => setLoading(false));

    }, []);
    let savedDataTafsir = localStorage.getItem("savedDataTafsir");
    let finalDataLastRead = JSON.parse(savedDataTafsir);

  const variantBox = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        // staggerChildren: 0.2,
      },
    },
  };

  const variantList = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };
  return (
    // <section className="bg-[#EAF2EF] dark:bg-[#2F243A]">
    //   <Navbar
    //     appbarName={"Tafsir Surat"}
    //     imgLeft={"./images/arrow-left.png"}
    //     linkTo={"/"}
    //   />
    //   <div className="pt-20">
    //     <h1>alsdalshjdasjkhd</h1>
    //   </div>
    //   <BottomNavbar />
    // </section>
    <>
      <div className="md:px-10">
        <Navbar
          appbarName={"Tafsir Surat"}
          imgLeft={"./images/arrow-left.png"}
          linkTo={"/"}
        />
      </div>
      <section className="pt-10 md:px-10 bg-[#EAF2EF] dark:bg-[#2F243A] -z-50">
        <div className="px-5">
          <motion.div
            animate={{
              opacity: 1,
            }}
            initial={{
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="md:grid grid-cols-2 justify-center items-center md:mt-10"
          >
            {/* style={{
            background:
              "linear-gradient(139deg, rgba(223,152,250,1) 14%, rgba(144,85,255,0.9753151260504201) 90%)",
          }} */}

            {/* <div className="w-full rounded-lg relative bg-[#542E71]">
              <div className="p-5">
                <div className="flex gap-3 items-center">
                  <img src="./images/small-book.png" alt="" />
                  <p className="text-white font-medium">Last Read</p>
                </div>

                <div className="mt-8">
                  <h1 className="font-semibold text-white text-xl">
                    Al-Fatihah
                  </h1>
                  <p className="text-white mt-2">Ayat No 1</p>
                </div>
              </div>
              <img
                src="./images/quran.png"
                alt=""
                className="absolute bottom-0 right-0"
              />
            </div> */}
          </motion.div>
        </div>

        <div className="mt-10">
          <div className="px-5">
            {finalDataLastRead == null ? (
              <div className="w-full rounded-lg relative bg-[#542E71]">
                <div className="p-5">
                  <div className="flex gap-3 items-center">
                    <img src="/images/small-book.png" alt="" />
                    <p className="text-white font-medium">Last Read</p>
                  </div>
                  <div className="mt-8">
                    <h1 className="font-semibold text-white text-xl">
                      Tidak Ada Data
                    </h1>
                    <p className="text-white mt-2">Tafsir ayat No 0</p>
                  </div>
                </div>
                <img src={Quran} alt="" className="absolute bottom-0 right-0" />
              </div>
            ) : (
              <Link
                to={`/tafsir/${finalDataLastRead.surat}/${finalDataLastRead.idSurat}/${finalDataLastRead.tafsir}`}
                className=""
              >
                <div className="w-full rounded-lg relative bg-[#542E71]">
                  <div className="p-5">
                    <div className="flex gap-3 items-center">
                      <img src="/images/small-book.png" alt="" />
                      <p className="text-white font-medium">Last Read</p>
                    </div>
                    <div className="mt-8">
                      <h1 className="font-semibold text-white text-xl">
                        {finalDataLastRead.surat}
                      </h1>
                      <p className="text-white mt-2">
                        Tafsir ayat No {finalDataLastRead.tafsir}
                      </p>
                    </div>
                  </div>
                  <img
                    src={Quran}
                    alt=""
                    className="absolute bottom-0 right-0"
                  />
                </div>
              </Link>
            )}

            <h1 className="font-bold text-primary-blue dark:text-white text-xl mt-5">
              Surat{" "}
            </h1>
          </div>
          <div className="">
            {loading ? (
              <div className="pb-10">
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            ) : (
              <motion.div
                className="md:grid grid-cols-2 lg:grid-cols-3 justify-start items-start"
                initial="hidden"
                animate="visible"
                variants={variantBox}
              >
                {surat.map((row) => (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    variants={variantList}
                    className=""
                  >
                    <Link
                      to={`/tafsir/${row.namaLatin}/${row.nomor}/0`}
                      className="my-3 mx-3 hover:bg-slate-50 flex justify-between items-center bg-white p-5 md:gap-10 rounded dark:bg-[#2B303B]"
                    >
                      <div className="flex items-center justify-start gap-5">
                        <div className="relative inline-block">
                          <img src="./images/nomer-surat.png" alt="" />
                          <p className="text-dark-blue dark:text-white font-bold absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-xs">
                            {row.nomor}
                          </p>
                        </div>
                        <div className="">
                          <h1 className="text-dark-blue dark:text-white font-medium text-lg">
                            {row.namaLatin}
                          </h1>
                          <p className="text-light-gray text-base">
                            {row.tempatTurun} - {row.jumlahAyat} Ayat
                          </p>
                        </div>
                      </div>
                      <h1 className="text-primary-blue dark:text-[#5BC0EB] font-bold text-2xl font-arabic">
                        {row.nama}
                      </h1>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
        <BottomNavbar />
      </section>
    </>
  );
};

export default Tafsir;
