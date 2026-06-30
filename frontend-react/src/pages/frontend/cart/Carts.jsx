import { useState } from "react";
import { getCartItems } from "../../../services/cartService.js";
import { useEffect } from "react";
import CartItems from "./CartItems.jsx";
import CartSummary from "./CartSummary.jsx";
import Loader from "../../../components/common/Loader.jsx";

function Cart() {
    const [orderSummary, setSrderSummary] = useState([]);
    const [isLoader, setIsLoader] = useState(false);

    const getOrderSummary = async () => {
        const cartSummary = await getCartItems();
        setSrderSummary(cartSummary?.data)
    }
    useEffect(() => {
        getOrderSummary();
    }, []);

    return (
        <div className="grid lg:grid-cols-3 gap-8">

            {isLoader && <Loader />}

            {/* Items */}
            <CartItems orderSummary={orderSummary} setIsLoader={setIsLoader} getOrderSummary={getOrderSummary} />


            {/* Summary */}
            <div>
                <CartSummary orderSummary={orderSummary} setSrderSummary={setSrderSummary} getOrderSummary={getOrderSummary} />
            </div>
        </div>
    );
}

export default Cart;