
import {RxCross1} from "react-icons/rx";
import {IoCheckmarkDoneCircleOutline} from "react-icons/io5";
import { useState } from "react";
import { useToRoute } from "../../hooks/useToRout";

const Modal = ({total}) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const goTo = useToRoute();

    return (
        <div className={`${isModalOpen ? " visible" : " invisible"} w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] flex items-center justify-center transition-all duration-300`}>
            <div className={`${isModalOpen ? " scale-[1] opacity-100" : " scale-[0] opacity-0"} w-[90%] sm:w-[80%] md:w-[50%] max-w-lg bg-[#fff] rounded-lg p-8 transition-all duration-300`} >
                <div className="w-full flex items-center justify-center flex-col">
                    <h2 className="text-[#2cac9f] text-[1.8rem] font-[500]">Payment Successfull!</h2>
                    <IoCheckmarkDoneCircleOutline className="p-2 text-[6rem] text-[#2cac9f]"/>

                    <p className="text-[1.2rem] text-[#585858] text-center ">Thanks for purchasing<br/>
                        <span className="font-[600]">Total: ${total}</span>
                    </p>
                </div>

                <div className="w-full flex items-center justify-center my-4">
                    <button className="px-20 py-2 bg-gray-200 hover:bg-white border border-[#a8a8a8] rounded-full text-[#585858]" onClick={() => {setIsModalOpen(false); goTo('/')}} > Cancel </button>
                </div>
            </div>
        </div>
    )
        ;
};

export default Modal;