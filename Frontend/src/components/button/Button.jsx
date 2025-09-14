

const Button = ({ text, cls, clickAction }) => {
    const clasess = `text-[#7f21c7] text-lg font-semibold bg-white px-5 py-2 border border-[#6b1eab] rounded-full hover:bg-[#6b1eab] hover:text-white hover:border-white transition duration-300 ${cls}`;
    
    return <button className={clasess} onClick={clickAction}>{text}</button>
};

export default Button;