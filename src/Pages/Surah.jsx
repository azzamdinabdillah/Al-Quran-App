import ArrowLeft from "../../public/images/arrow-left.png";
import Search from "../../public/images/search.png";
import Book from "../../public/images/quran.png";
import Bismillah from "../../public/images/bismillah.png";

const Surah = () => {
    return (
        <section className="px-5 py-5">
            <div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                    <img src={ArrowLeft} alt="" />
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
                            <h1 className="font-medium text-white text-2xl text-center">Al-Fatihah</h1>
                            <p className="text-center text-white mt-2">Pembukaan</p>

                            <hr className="w-[70%] mx-auto my-5" />

                            <p className="text-center text-white mt-2 font-medium text-lg">Mekkah - 7 ayat</p>
                            <img src={Bismillah} alt="" className="mx-auto mt-5" />
                        </div>
                    </div>
                    <img src={Book} alt="" className="absolute bottom-5 right-10 opacity-10 scale-150" />
                </div>
            </div>

            <div className="w-full border mt-10 p-5">
                 <h1 className="bg-blue-300 text-white inline-block px-3 py-1 rounded-full">1</h1>
                 <p></p>
            </div>
            </div>
        </section>
    )
}

export default Surah;