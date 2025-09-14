import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="w-full max-w-[800px] mx-auto px-4 py-10 text-black">
            {/* logo & details */}
            <div className="text-center p-4">
                <Link to='/' className="text-3xl font-bold ">Gadget Haven</Link>

                <p className="my-4 font-medium textforthary ">Your one-stop shop for all your gadget needs.</p>
            </div>

            {/* importent links */}
            <div className="text-center flex flex-wrap justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold">Company</h3>
                    <Link to='/' className="textprimary">About Us</Link>
                    <Link to='/' className="textprimary">Contact</Link>
                    <Link to='/' className="textprimary">Careers</Link>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold">Services</h3>
                    <Link to='/' className="textprimary">Product Support</Link>
                    <Link to='/' className="textprimary">Order Tracking</Link>
                    <Link to='/' className="textprimary">Shipping & Delivery</Link>
                    <Link to='/' className="textprimary">Returns</Link>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold">Legal</h3>
                    <Link to='/' className="textprimary">Terms of Service</Link>
                    <Link to='/' className="textprimary">Privicy Policy</Link>
                    <Link to='/' className="textprimary">Cookie Policy</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;