import Link from "next/link";
import React from "react";
import mongoose from "mongoose";
import Product from "@/models/Product";

const tshirt = ({ products }) => {
  // console.log(productData);
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {Object.keys(products).map((productData) => {
              return (
                <Link
                  passHref
                  legacyBehavior
                  href={`/product/${products[productData].slug}`}
                  key={products[productData]._id}
                >
                  <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-lg">
                    <a className="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="h-[30vh] md:h-[36vh] block m-auto"
                        src={products[productData].img}
                      />
                    </a>
                    <div className="mt-4 text-center">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 ">
                        {products[productData].category}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {products[productData].title}
                      </h2>
                      <p className="mt-1">$ {products[productData].price}</p>

                      <div className="mt-1">
                        {products[productData].size.includes("S") && (
                          <span className="border border-gray-600 mx-1 px-1">
                            S
                          </span>
                        )}

                        {products[productData].size.includes("M") && (
                          <span className="border border-gray-600 mx-1 px-1">
                            M
                          </span>
                        )}
                        {products[productData].size.includes("L") && (
                          <span className="border border-gray-600 mx-1 px-1">
                            L
                          </span>
                        )}
                        {products[productData].size.includes("XL") && (
                          <span className="border border-gray-600 mx-1 px-1">
                            XL
                          </span>
                        )}
                        {products[productData].size.includes("XXL") && (
                          <span className="border border-gray-600 mx-1 px-1">
                            XXL
                          </span>
                        )}
                      </div>
                      <div className="mt-1">
                        {products[productData].color.includes("green") && (
                          <button className="border-2 border-gray-300  bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[productData].color.includes("pink") && (
                          <button className="border-2 border-gray-300  bg-pink-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[productData].color.includes("blue") && (
                          <button className="border-2 border-gray-300  bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[productData].color.includes("black") && (
                          <button className="border-2 border-gray-300  bg-black-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[productData].color.includes("yellow") && (
                          <button className="border-2 border-gray-300  bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "tshirt" });

  let tshirts = {};
  for (let item of products) {
    if (item.title in tshirts) {
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].color.push(item.color);
      }
      if (
        !tshirts[item.title].size.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].size.push(item.size);
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) },
  };
}

export default tshirt;
