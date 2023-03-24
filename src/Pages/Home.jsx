import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {

    let [surat, setSurat] = useState([]);
    let [dark, setDark] = useState(false);

    useEffect(() => {
        fetch("https://equran.id/api/v2/surat").then((response) => response.json()).then((data) => setSurat(data.data));
    }, []);

    useEffect(() => {
        if (dark) {
            document.querySelector(".darkClassPlace").classList.add("dark");
        }else{
            document.querySelector(".darkClassPlace").classList.remove("dark");
        }
    }, [dark])

    return (
        <section className="pt-5 md:px-20">
            <div className="px-5">
                <div className="flex justify-between items-center">
                    <div className="flex justify-start items-center gap-5">
                        <img src="./images/menu.png" alt="" className="" />
                        <h1 className="text-primary-blue dark:text-white font-bold text-2xl">Quran App</h1>
                    </div>
                    <div className="flex justify-start items-center">
                        <img onClick={() => setDark(!dark)} src={dark ? "./images/light.png" : "./images/dark.png"} alt="" className="scale-50 toggleDark" />
                        <img src="./images/search.png" alt="" />
                    </div>
                </div>

                <div className="md:grid grid-cols-2 justify-center items-center md:mt-10">
                <div className="my-8">
                    <p className="font-medium text-light-gray text-lg">Assalamualaikum</p>
                    <h1 className="text-dark-blue dark:text-white font-semibold text-2xl mt-1">Azam Din Abdillah</h1>
                </div>

                <div className="w-full rounded-lg relative" style={{ 
                    background: "linear-gradient(139deg, rgba(223,152,250,1) 14%, rgba(144,85,255,0.9753151260504201) 90%)"
                 }}>
                    <div className="p-5">
                        <div className="flex gap-3 items-center">
                        <img src="./images/small-book.png" alt="" />
                        <p className="text-white font-medium">Last Read</p>
                        </div>

                        <div className="mt-8">
                            <h1 className="font-semibold text-white text-xl">Al-Fatihah</h1>
                            <p className="text-white mt-2">Ayat No 1</p>
                        </div>
                    </div>
                    <img src="./images/quran.png" alt="" className="absolute bottom-0 right-0" />
                </div>
                </div>
            </div>

            <div className="mt-10">
                <div className="px-5">
                    <h1 className="font-bold text-primary-blue dark:text-white text-xl ">Surat </h1>
                </div>
                <div className="md:grid grid-cols-2 gap-x-10">
                {surat.map((row) => (
                    <Link to={`/surah/${row.nomor}`} className="py-5 px-5 hover:bg-slate-50 flex justify-between items-center">
                    <div className="flex items-center justify-start gap-5">
                    <div className="relative inline-block">
                        <img src="./images/nomer-surat.png" alt="" />
                        <p className="text-dark-blue dark:text-white font-bold absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-xs">{row.nomor}</p>
                    </div>
                    <div className="">
                        <h1 className="text-dark-blue dark:text-white font-medium text-lg">{row.namaLatin}</h1>
                        <p className="text-light-gray text-base">{row.tempatTurun} - {row.jumlahAyat} Ayat</p>
                    </div>
                    </div>
                    <h1 className="text-primary-blue dark:text-[#A44AFF] font-bold text-2xl font-arabic">{row.nama}</h1>
                </Link>
                ))}
                </div>
            </div>
        </section>
    )
}

export default Home;