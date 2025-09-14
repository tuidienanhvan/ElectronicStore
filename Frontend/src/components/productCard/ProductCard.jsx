import { useToRoute } from "../../hooks/useToRout";
import Button from "../button/Button";

const ProductCard = ({ item }) => {
    const goTo = useToRoute();
    const handleViewDetails = () => {
        goTo(`products/${item.product_id}`, item );
    }


    return (
        <div className="w-full min-w-[280px] max-w-[320px] p-4 bg-[#dfdcde]/70 boxShadow rounded-xl">
            <img src={item.product_image} alt={item.product_title} className="border w-full h-[200px] object-cover rounded-xl"
            />

            <div className="pt-4 h-30">
                <h1 className="text-[1.4rem] font-bold leading-[34px]">{item.product_title}</h1>
                <p className="text-[1.0rem] font-medium text-gray-600">$ {item.price}</p>
            </div>

            <Button text="View Details" cls="float-right" clickAction={handleViewDetails} />
        </div>
    );
};

export default ProductCard;