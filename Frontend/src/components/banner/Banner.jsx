import Button from "../button/Button";
import bannerImg from "../../assets/image/banner.jpg";

const Banner = () => {
    return (
        <div className="relative h-[600px] md:h-[700px] bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-20 right-10 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            {/* Content container */}
            <div className="relative flex flex-col justify-center items-center h-full py-6 px-4">
                {/* Text content */}
                <div className="w-full max-w-3xl mx-auto text-center mb-6">
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
                            Upgrade Your Tech Experience
                        </span>
                        <span className="block mt-2 text-xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200">
                            with Gadget Heaven Accessories
                        </span>
                    </h1>
                    <p className="text-sm md:text-base text-gray-200 max-w-xl mx-auto mb-6 leading-relaxed">
                        Explore the latest gadgets that will take your experience to the next level. 
                        From smart devices to the coolest accessories, we have it all!
                    </p>

                    <a href="#displaysection" className="inline-block">
                        <Button 
                            text='Shop Now' 
                            cls='bg-white hover:bg-opacity-90 text-purple-900 px-5 py-2.5 rounded-full font-medium text-sm transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
                        />
                    </a>
                </div>

                {/* Image container */}
                <div className="w-full max-w-2xl mx-auto px-4">
                    <div className="relative">
                        {/* Gradient overlay for image */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient"></div>
                        
                        <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-1.5">
                            <img 
                                src={bannerImg} 
                                alt="Latest Tech Gadgets" 
                                className="w-full h-[200px] md:h-[300px] object-cover rounded-xl shadow-2xl transform hover:scale-[1.01] transition-transform duration-500"
                            />
                            
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Add these animations to your global CSS or tailwind.config.js
// @keyframes blob {
//   0% { transform: translate(0px, 0px) scale(1); }
//   33% { transform: translate(30px, -50px) scale(1.1); }
//   66% { transform: translate(-20px, 20px) scale(0.9); }
//   100% { transform: translate(0px, 0px) scale(1); }
// }
// .animate-blob {
//   animation: blob 7s infinite;
// }
// .animation-delay-2000 {
//   animation-delay: 2s;
// }
// .animation-delay-4000 {
//   animation-delay: 4s;
// }

export default Banner;