import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Heart } from "lucide-react";

const ProductItem = ({
    _id,
    images,
    image,
    image1,
    name,
    price,
    showWishlist = false,
    onWishlist,
    isWishlisted,
}) => {
    const { currency = "₹" } = useAppContext();

    const productImage = images?.[0] || image?.[0] || image || image1;

    return (
        <Link
            to={`/products/${_id}`}
            onClick={() => window.scrollTo(0, 0)}
            className="relative block text-gray-700 cursor-pointer"
        >
            <div className="relative overflow-hidden ">
                {showWishlist && (
                    <button
                        type="button"
                        onClick={onWishlist}
                        className="absolute top-3 right-3 z-20 p-2 bg-white rounded-full shadow-md"
                    >
                        <Heart
                            size={20}
                            className={
                                isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
                            }
                        />
                    </button>
                )}

                <img
                    src={productImage || "/images/placeholder.png"}
                    alt={name}
                    className="w-full h-[250px] md:h-[300px] object-cover hover:scale-110 transition duration-300"
                />
            </div>

            <p className="pt-3 pb-1 text-sm">{name}</p>

            <p className="text-sm font-medium">
                {currency}{Number(price || 0).toFixed(2)}
            </p>
        </Link>
    );
};

export default ProductItem;