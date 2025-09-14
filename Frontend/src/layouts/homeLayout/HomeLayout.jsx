import Banner from "../../components/banner/Banner";
import ProductDisplayLayout from "../productDisplayLayout/ProductDisplayLayout";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const HomeLayout = () => { 
    return (
        <section>            
      

      <Banner/>

      <ProductDisplayLayout/>
      

      

      {/* copyright */}
      <div className="border-t border-[#c4bfbf] py-4">
        <p className="text-center text-sm">© 2023 Gadget Haven. All rights reserved. Developed by jabirstain3</p>
      </div>
      
    </section>
        
    );
};

export default HomeLayout;