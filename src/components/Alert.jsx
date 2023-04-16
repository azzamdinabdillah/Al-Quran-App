import { motion } from "framer-motion";
import {AiFillCheckCircle, AiFillCloseCircle} from "react-icons/ai"
import { NewMainContext } from "../context/MainContext";

const Alert = (props) => {

    const {setAlert, setOpen, setChooseFolder} = NewMainContext();

    return (
        <motion.div animate={{ 
            x:-3
            // opacity:1
         }} initial={{ 
            x:100
          }} className="fixed top-8 right-0 z-50 w-auto text-white py-5 px-5 mx-5 rounded-md bg-biru-tua dark:bg-biru-muda shadow-2xl">
            <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-3">
                <AiFillCheckCircle size={30} />
                <h1 className="font-medium">{props.message}</h1>
                </div>
                <AiFillCloseCircle size={35} onClick={() => {
                    setChooseFolder(false);
                    setOpen(false);
                    setAlert(false);
                }} className="cursor-pointer"/>
            </div>
        </motion.div>
    )
}

export default Alert;