import { Outlet, useLocation } from "react-router";
import SubBanner from "../../components/subBanner/SubBanner";
import { useEffect, useState } from "react";
import Button2 from "../../components/button2/Button2";
import { useToRoute } from "../../hooks/useToRout";

const DashboardLayout = () => {
    const { pathname } = useLocation();
    const [selectedRoute, setSelectedRoute] = useState("cart");
    const goTo = useToRoute();

    const handleRouteChange = (route) => {
        setSelectedRoute(route);
        goTo(route);
    };

    useEffect(() => {
        const currentPath = pathname.split("/").pop();
        if (currentPath === "cart" || currentPath === "wishlist") {
            setSelectedRoute(currentPath);
            // console.log(currentPath);
        } 
    }, [pathname]);

    const nestedRoutes = [
        { id: "12411", name: "Cart", path:"cart" },
        { id: "12410", name: "Wishlist", path:"wishlist" },
    ];

    const title = "Dashboard";
    const description = "Welcome to your dashboard! Here you can manage your account, view your orders, and access exclusive features. Your personalized experience starts here!";

    return (
        <div>
            <SubBanner heading={title} intro={description} />
            <div className="w-full bg-[#F6F6F6] py-10 lg:py-14">
                <div className="w-full max-w-[100px] mx-auto px-4 flex justify-center items-center gap-4">
                    { nestedRoutes.map((ctg) => <Button2 key={ctg.id} text={ctg.name} cls="w-fit " clickAction={() => handleRouteChange(ctg.path)} selected={selectedRoute === ctg.path} />)}
                </div>
                <Outlet/>
            </div>
        </div>
    );
};

export default DashboardLayout;