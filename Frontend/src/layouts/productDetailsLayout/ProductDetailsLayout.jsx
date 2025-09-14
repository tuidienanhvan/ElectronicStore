import { useParams } from 'react-router-dom';
import ProductDetailsCard from '../../components/productDetailCard/ProductDetailsCard';
import SubBanner from '../../components/subBanner/SubBanner';
import { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';

const ProductDetailsLayout = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await productService.getProductById(id);
                setProduct(data);
            } catch (err) {
                setError('Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.');
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const title = "Product Details";
    const description = "Get an in-depth look at your selected product! Explore its features, specifications, and everything you need to know to make an informed decision. At Gadget Heaven, we ensure you have all the details at your fingertips."
    
    if (loading) {
        return <LoadingSpinner />;
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F6F6F6]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
                    <p className="text-gray-600">{error || "The product you're looking for doesn't exist."}</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className='w-full bg-[#F6F6F6]'>
            <SubBanner heading={title} intro={description} />
            <ProductDetailsCard product={product} />
        </div>
    );
};

export default ProductDetailsLayout;