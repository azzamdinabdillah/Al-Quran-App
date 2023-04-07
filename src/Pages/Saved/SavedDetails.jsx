import Navbar from "../../components/Navbar";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Skeleton from "../../components/Skeleton";
import { Link, useParams } from "react-router-dom";
import { GoogleButton } from "react-google-button";
import { BiDotsVerticalRounded } from "react-icons/bi";
import MenuDotThree, { MenuDotThreeDetailsSaved } from "../../components/MenuDotThree";
import { NewMainContext } from "../../context/MainContext";
import { UserAuth } from "../../context/AuthContext";

const SavedDetails = () => {
  let [saved, setSaved] = useState([]);
  let [loading, setLoading] = useState(true);
  let [dataSavedDetails, setDataSavedDetails] = useState();
  let { list, id } = useParams();
  let {deleteSavedDetails, setDeleteSavedDetails} = NewMainContext();

  let { user } = UserAuth();

  useEffect(() => {
    let collectionRef = collection(db, "saved");
    let queryRef = query(
      collectionRef,
      where("folder", "==", id),
      where("list", "==", list, "&&"),
      where("user", "==", user.uid, "&&")
    );

    getDocs(queryRef).then((response) => {
      let arr = [];
      response.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setSaved(arr);
      setLoading(false);
    });

    getDoc(doc(db, "folder", id)).then((response) =>
      setDataSavedDetails(response.data().folderName)
    );
  }, [deleteSavedDetails]);

  return (
    <>
      <div className="md:px-10">
        <Navbar
          imgLeft={"/images/arrow-left.png"}
          appbarName={`${dataSavedDetails}`}
          linkTo={list == "tafsir" ? "/saved/tafsir" : "/saved/alquran"}
        />
      </div>
      <section className="pt-24 md:pt-5 pb-28 lg:w-[50%] md:w-[60%] md:ml-10">
        <div className="">
          {/* <div className="flex justify-start items-center gap-3">
            <img src="./images/add-saved.png" alt="" className="w-[10%]" />
            <p className="text-primary-blue font-semibold text-lg">
              Tambah Folder Simpanan Baru
            </p>
          </div> */}
          {loading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <div className="flex flex-col gap-3">
              {saved.length <= 0 ? (
                <h1 className="font-semibold text-primary-blue px-10 text-center mt-10">
                  Bookmark Kosong, Silahkan Menyimpan Terlebih Dahulu
                </h1>
              ) : (
                saved.map((row) => (
                  <motion.div
                  key={row.id}
                    // whileHover={{ scale: 1.1 }}
                    // whileTap={{ scale: 0.9 }}
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    className="flex relative bg-white rounded mx-3 p-3 dark:bg-[#2B303B] justify-between items-center "
                  >
                    <Link
                      to={`/${list}/${row.surat}/${row.idSurat}/${row.ayat}`}
                      className="gap-3w-full"
                    >
                      <div className="flex justify-start items-center gap-5 w-full ">
                        <div className="relative inline-block">
                          <img src="/images/nomer-surat.png" alt="" />
                          <p className="text-dark-blue dark:text-white font-bold absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-xs">
                            {row.ayat}
                          </p>
                        </div>
                        <div className="">
                          <p className="text-primary-blue dark:text-white font-medium">
                            {list == "tafsir" ? "Tafsir" : "Surat"} {row.surat}
                          </p>
                          <p className="text-light-gray">
                            Ayat ke {row.ayat} Surat ke {row.idSurat}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <div className="cursor-pointer">
                    <MenuDotThreeDetailsSaved
                      idSaved={row.id}
                      folderName={row.folderName}
                      list={"tafsir"}
                    />
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SavedDetails;
