import { motion } from "framer-motion";

export const SkeletonDetails = () => {
  return (
    <motion.div
      animate={{
        opacity: 0.5,
      }}
      initial={{
        opacity: 1,
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      className="my-3 hover:bg-slate-50 bg-slate-50 px-5 py-7 rounded dark:bg-[#2B303B]"
    >
      <div className="flex items-center justify-between gap-5">
        <div className="bg-slate-200 dark:bg-slate-700 rounded-full p-5"></div>
        <div className="">
          <div className="bg-slate-200 dark:bg-slate-700 w-[8rem] mx-auto py-2 rounded-full"></div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-slate-200 dark:bg-slate-700 w-[10rem] mt-3 py-2 rounded-full"></div>
      </div>
      <div className="mt-6">
        <div className="bg-slate-200 dark:bg-slate-700 w-full mt-3 py-2 rounded-full"></div>
        <div className="bg-slate-200 dark:bg-slate-700 w-full mt-3 py-2 rounded-full"></div>
        <div className="bg-slate-200 dark:bg-slate-700 w-full mt-3 py-2 rounded-full"></div>
      </div>
    </motion.div>
  );
};

const Skeleton = () => {
  return (
    <motion.div
      animate={{
        opacity: 0.5,
      }}
      initial={{
        opacity: 1,
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      className="my-3 mx-3 hover:bg-slate-50 flex justify-between items-center bg-slate-50 p-5 rounded dark:bg-[#2B303B]"
    >
      <div className="flex items-center justify-start gap-5">
        <div className="bg-slate-200 dark:bg-slate-700 rounded-full p-5"></div>
        <div className="">
          <div className="bg-slate-200 dark:bg-slate-700 w-[8rem] py-2 rounded-full"></div>

          <div className="bg-slate-200 dark:bg-slate-700 w-[10rem] mt-3 py-2 rounded-full"></div>
        </div>
      </div>
      <div className="bg-slate-200 dark:bg-slate-700 w-[3rem] mt-3 py-2 rounded-full"></div>
    </motion.div>
  );
};

export default Skeleton;
