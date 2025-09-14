import { useRequireAuth } from '../../hooks/useRequireAuth';
import { useContext, useState } from 'react';
import { CartContext } from '../../utils/context/CartContext';
import ProductListCard from '../../components/productListCard/ProductListCard';
import SubBanner from '../../components/subBanner/SubBanner';
import Modal from '../../components/modal/Modal';

const CartPage = () => {
    // Sử dụng hook useRequireAuth để bảo vệ trang
    const user = useRequireAuth();
    const { cart } = useContext(CartContext);
    const [showModal, setShowModal] = useState(false);

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    // Chỉ render nội dung nếu đã đăng nhập
    if (!user) return null;

    return (
        <div className="w-full min-h-screen">
            <SubBanner
                heading="Your Shopping Cart"
                intro="Review your items and proceed to checkout"
            />

            <div className="sectionBase w-full mx-auto my-10">
                <div className="w-full flex flex-col gap-4">
                    {cart.length === 0 ? (
                        <div className="w-full border rounded-lg flex justify-center items-center h-[360px]">
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        <>
                            {cart.map((item) => (
                                <ProductListCard key={item.product_id} item={item} />
                            ))}
                            
                            <div className="w-full flex justify-between items-center p-4 bg-white rounded-xl">
                                <p className="text-xl font-semibold">Total: ${total}</p>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="px-6 py-2 bg-[#9538E2] text-white rounded-full hover:bg-[#6b1eab]"
                                >
                                    Checkout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {showModal && <Modal total={total} />}
        </div>
    );
};

export default CartPage; 