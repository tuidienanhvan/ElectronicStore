
const SubBanner = ({ heading, intro }) => {
    return (
        <div className="bgprimary flex justify-evenly items-center py-10 lg:py-14">
            <div className="w-full text-white max-w-4xl px-4 text-center ">
                <h1 className="w-full mx-auto text-4xl font-bold ">{heading}</h1>
                <p className="w-full mt-6 text-base max-w-2xl mx-auto">{intro}</p>
            </div>
        </div>
    );
};

export default SubBanner;