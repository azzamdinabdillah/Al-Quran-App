import ArrowLeft from "/images/arrow-left.png";
import Search from "/images/search.png";
import Book from "/images/quran.png";
import Bismillah from "/images/bismillah.png";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Surah = () => {

    let [data, setData] = useState([]);
    let [ayat, setAyat] = useState([]);
    let {id} = useParams()

    useEffect(() => {
        fetch(`https://equran.id/api/v2/surat/${id}`).then((response) => response.json()).then((finalData) => setData(finalData.data));

        fetch(`https://equran.id/api/v2/surat/${id}`).then((response) => response.json()).then((finalData) => setAyat(finalData.data.ayat));
    }, [])

    return (
        <section className="px-5 py-5">
            <div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                    <Link to={"/"}>
                    <img src={ArrowLeft} alt="" />
                    </Link>
                    <h1 className="text-primary-blue font-bold text-xl">Al-Fatihah</h1>
                </div>
                <div>
                    <img src={Search} alt="" />
                </div>
            </div>

            <div>
            <div className="w-full mt-5 overflow-hidden rounded-lg relative shadow-primary-blue" style={{ 
                    background: "linear-gradient(139deg, rgba(223,152,250,1) 14%, rgba(144,85,255,0.9753151260504201) 90%)"
                 }}>
                    <div className="px-5 py-10">
                        <div className="">
                            <h1 className="font-medium text-white text-2xl text-center">{data.namaLatin}</h1>
                            <p className="text-center text-white mt-2">{data.arti}</p>

                            <hr className="w-[70%] mx-auto my-5" />

                            <p className="text-center text-white mt-2 font-medium text-lg">{data.tempatTurun} - {data.jumlahAyat} ayat</p>
                            <img src={Bismillah} alt="" className="mx-auto mt-5" />
                        </div>
                    </div>
                    <img src={Book} alt="" className="absolute bottom-5 right-10 opacity-10 scale-150" />
                </div>
            </div>

            {ayat.map((row) => (
            <div className="w-full border-b-2 mt-5 py-5 px-2">
                 <h1 className="bg-blue-300 text-white inline-block px-3 py-1 rounded-full">{row.nomorAyat}</h1>
                 <div className="my-5">
                 <p className="text-end font-arabic font-bold text-2xl leading-loose">{row.teksArab}</p>
                 <p className="text-end mt-5 font-semibold">{row.teksLatin}</p>
                 </div>
                 <p className="text-dark-blue font-medium">{row.teksIndonesia}</p>
            </div>
            ))}
            </div>
        </section>
    )
}

export default Surah;