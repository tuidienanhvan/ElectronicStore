
import React from "react";
import { useToRoute } from "../../hooks/useToRout";

const ErrorPage = () => {
    const goTo = useToRoute();

    return (
        <div className="boxShadow px-10 w-full h-screen flex items-center flex-col justify-center py-20 rounded-xl">
            <img src="https://i.ibb.co/SVMTKPy/Frame-5.png" alt="illustration" className="w-full lg:w-[400px]"/>
            <p className="text-[#73718A] text-[0.9rem] sm:text-[1.2rem] w-full lg:w-[55%] text-center mt-10 lg:mt-4">The page cannot be found. The requested URL was not found on this server.</p>

            <button className="py-3 px-8 rounded-full bg-[#4538FF] text-white mt-8" onClick={() => goTo('/')}>Back to home </button>
        </div>
    );
};

export default ErrorPage;