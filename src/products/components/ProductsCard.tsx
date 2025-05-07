'use client';


// https://tailwindcomponents.com/component/e-commerce-product-card

import Image from "next/image"
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5";
import { Star } from "./Star";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { addProductToCart, removeProductFromCart } from "@/shooping-cart/actions";

interface Props {
    id: string;
    name: string;
    price: number;
    rating: number;
    image: string;
}


export const ProductCard = ({ id, name, price, rating, image }: Props) => {

    const router = useRouter();

    const onAddToCart = () => {
        addProductToCart(id);
        router.refresh();
    }

    const onRemoveFromCart = () => {
        removeProductFromCart(id);
        router.refresh();
    }


    return (
        <div className="bg-gray-900 shadow-xl rounded-xl">

            {/* Product Image */}
            <section className="p-2">
                <Image
                    width={500}
                    height={500}
                    className="rounded"
                    src={image}
                    alt="product image" />
            </section>

            {/* Title */}
            <section className="px-5 pb-5">
                <Link href="#">
                    <h3 className="text-white font-semibold text-xl tracking-tight">
                        {name}
                    </h3>
                </Link>
                <div className="flex items-center mt-2.5 mb-5">


                    {/* Stars */}
                    {
                        Array(rating).fill(0).map((x, i) => (
                            <Star key={i} />
                        ))
                    }


                    {/* Rating Number */}
                    <span className="text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ml-3">
                        {rating.toFixed(2)}
                    </span>
                </div>


                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                    <span className="text-white text-2xl font-bold">
                        ${price.toFixed(2)}
                    </span>

                    <div className="flex">
                        <button
                            onClick={onAddToCart}
                            className="text-white mr-2  focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-sky-500 hover:bg-blue-600 focus:ring-blue-800">
                            <IoAddCircleOutline size={25} />
                        </button>
                        <button
                            onClick={onRemoveFromCart}
                            className="text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-500 hover:bg-red-700 focus:ring-red-800">
                            <IoTrashOutline size={20} />
                        </button>
                    </div>

                </div>
            </section>
        </div>
    )
}


