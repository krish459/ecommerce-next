import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md">
      <div className="logo mx-5 my-2">
        <Image src="/images/logo.jpg" alt="logo" height={40} width={150} />
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
          <Link href={"/sticker"} legacyBehavior>
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
      <div className="cart absolute right-0 top-4 mx-5 md:text-xl">
        <AiOutlineShoppingCart className="text-4xl" />
      </div>
    </div>
  );
};

export default Navbar;
