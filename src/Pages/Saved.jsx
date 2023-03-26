import BottomNavbar from "../components/BottomNavbar";
import Navbar from "../components/Navbar";

const Saved = () => {
  return (
    <>
      <Navbar imgLeft={"./images/arrow-left.png"} appbarName={"Saved"} />
      <section className="pt-24 pb-10 px-6 h-[100vh] bg-[#EAF2EF] dark:bg-[#2F243A]">
        <div>
          <div className="flex justify-start items-center gap-3">
            <img src="./images/add-saved.png" alt="" className="w-[10%]" />
            <p className="text-primary-blue font-semibold text-lg">
              Tambah Folder Simpanan Baru
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-5">
            <div className="flex justify-between items-center gap-3">
              <div className="flex justify-start items-center gap-5 w-full">
                <img src="./images/saved-1.png" alt="" className="w-[10%]" />
                <div className="">
                  <p className="text-primary-blue font-medium">Pak Muhari</p>
                  <p className="text-light-gray">6 Items</p>
                </div>
              </div>
              <img src="./images/menu-saved.png" alt="" />
            </div>
            <div className="flex justify-between items-center gap-3">
              <div className="flex justify-start items-center gap-5 w-full">
                <img src="./images/saved-1.png" alt="" className="w-[10%]" />
                <div className="">
                  <p className="text-primary-blue font-medium">Daily</p>
                  <p className="text-light-gray">10 Items</p>
                </div>
              </div>
              <img src="./images/menu-saved.png" alt="" />
            </div>
          </div>
        </div>
      </section>
      <BottomNavbar />
    </>
  );
};

export default Saved;
