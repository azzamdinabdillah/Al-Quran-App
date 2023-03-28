import { motion } from "framer-motion";
import {AiFillCheckCircle} from "react-icons/ai"

const Alert = (props) => {
    return (
        <motion.div animate={{ 
            x:-3
            // opacity:1
         }} initial={{ 
            x:100
          }} className="fixed top-8 right-3 z-50 w-[70%] text-white py-5 px-5 rounded-md bg-biru-tua dark:bg-biru-muda shadow-2xl">
            <div className="flex items-center gap-3">
                <AiFillCheckCircle size={30} />
                <h1 className="font-medium">{props.message}</h1>
            </div>
        </motion.div>
    )
}

export default Alert;