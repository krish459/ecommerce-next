import Link from "next/link";
import React from "react";

const hoodies = ({ productData }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {productData.products.map((productData) => {
              return (
                productData.category == "hoodies" && (
                  <Link
                    passHref
                    legacyBehavior
                    href={`/product/${productData.slug}`}
                    key={productData._id}
                  >
                    <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-lg">
                      <a className="block relative rounded overflow-hidden">
                        <img
                          alt="ecommerce"
                          className="h-[30vh] md:h-[36vh] block m-auto"
                          src={productData.img}
                        />
                      </a>
                      <div className="mt-4 text-center">
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 ">
                          {productData.category}
                        </h3>
                        <h2 className="text-gray-900 title-font text-lg font-medium">
                          {productData.title}
                        </h2>
                        <p className="mt-1">$ {productData.price}</p>
                        <p className="mt-1">{productData.size}</p>
                      </div>
                    </div>
                  </Link>
                )
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/getproducts");

  const productData = await res.json();
  return {
    props: { productData },
  };
}

export default hoodies;
