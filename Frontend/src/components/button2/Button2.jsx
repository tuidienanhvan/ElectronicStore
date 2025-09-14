
const Button2 = ({ text, cls, clickAction, selected  }) => {
    return <button className={`${cls} px-6 py-2 rounded-full ${selected? "bg-[#6b1eab] text-white font-bold" : "bg-white text-[#424242] font-semibold "}`} onClick={clickAction}>{text}</button>
};

export default Button2;