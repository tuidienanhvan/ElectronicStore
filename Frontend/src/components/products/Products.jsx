import { useEffect, useState } from "react";
import ProductCard from "../productCard/ProductCard";

const Products = ( {cat} ) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        setIsLoading(true);
        setError(null);
        
        fetch('/electronic_gadgets.json')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }
                return res.json();
            })
            .then((data) => {
                if (cat === "All Products") {
                    setItems(data);
                } else {
                    const filteredItems = data.filter((item) => item.category === cat);
                    setItems(filteredItems);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setError('Failed to load products. Please try again later.');
                setIsLoading(false);
            });
    }, [cat]);

    if (isLoading) {
        return (
            <div className="w-full border rounded-lg flex justify-center items-center h-[360px]">
                <p className="text-lg">Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full border rounded-lg flex justify-center items-center h-[360px]">
                <p className="text-lg text-red-500">{error}</p>
            </div>
        );
    }
    
    return (
        <div className="w-full flex flex-wrap justify-center md:justify-start gap-4 mt-4 md:mt-0">
            {items.length > 0 ? (
                items.map((item) => <ProductCard key={item.product_id} item={item} />)
            ) : (
                <div className="w-full border rounded-lg flex justify-center items-center h-[360px]">
                    <p className="text-lg">No products found in this category.</p>
                </div>
            )}
        </div>
    );
};

export default Products;