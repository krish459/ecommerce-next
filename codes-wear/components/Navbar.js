import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

import {
  AiOutlineShoppingCart,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { BsFillBagCheckFill } from "react-icons/bs";

const Navbar = ({ cart, addtoCart, removeFromCart, clearCart, subTotal }) => {
  //   console.log(cart, addtoCart, removeFromCart, clearCart, subTotal);
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 bg-white z-10">
      <div className="logo mx-5 my-2">
        <Link href={"/"} legacyBehavior>
          <a>
            <Image src="/images/logo.jpg" alt="logo" height={40} width={150} />
          </a>
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-6 md:text-md font-bold">
          <Link href={"/tshirt"} legacyBehavior>
            <a>
              <li>Tshirts</li>
            </a>
          </Link>
          <Link href={"/hoodies"} legacyBehavior>
            <a>
              <li>Hoodies</li>
            </a>
          </Link>
          <Link href={"/stickers"} legacyBehavior>
            <a>
              <li>Stickers</li>
            </a>
          </Link>
          <Link href={"/mugs"} legacyBehavior>
            <a>
              <li>Mugs</li>
            </a>
          </Link>
        </ul>
      </div>
      <div
        className="cart absolute right-0 top-4 mx-5 md:text-xl cursor-pointer"
        onClick={toggleCart}
      >
        <AiOutlineShoppingCart className="text-4xl" />
      </div>
      <div
        ref={ref}
        className={`w-72 h-100vh sidecart absolute top-0 right-0 bg-pink-100 px-8 py-10 transition-transform ${
          Object.keys(cart).length === 0
            ? "translate - x - 0"
            : "translate - x - full"
        } transform `}
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"
          onClick={toggleCart}
        >
          {" "}
          <ImCross />{" "}
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="my-4 font-semibold ">No items in the Cart.</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex">
                  <div className="w-2/3 font-semibold my-5">{cart[k].name}</div>
                  <div className="flex items-center justify-center w-1/3 font-semibold text-lg">
                    <AiOutlineMinusCircle
                      className="cursor-pointer text-red-900"
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].varient
                        );
                      }}
                    />
                    <span className="mx-2 text">{cart[k].qty}</span>
                    <AiOutlinePlusCircle
                      onClick={() => {
                        addtoCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].varient
                        );
                      }}
                      className="cursor-pointer text-green-700"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <span className="total font-bold">SubTotal: ₹{subTotal}</span>
        <div className="flex">
          <Link href={"/checkout"}>
            <button className="flex   text-white border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm bg-pink-300 mr-2">
              <BsFillBagCheckFill className="m-1" />
              Checkout
            </button>
          </Link>
          <button
            className="flex   text-white border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm bg-pink-300 mr-2"
            onClick={clearCart}
          >
            {/* <BsFillBagCheckFill className="m-1" /> */}
            Clearcart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
