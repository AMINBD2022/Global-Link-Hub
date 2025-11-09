import React, { use } from "react";
import SingleProduct from "./SingleProduct";
import { Link } from "react-router-dom";

const Products = ({ productsPromise }) => {
  const AllProducts = use(productsPromise);
  const products = AllProducts.slice(0, 6);

  return (
    <div className="flex flex-col justify-center items-center py-15">
      <h2 className="text-center text-6xl font-bold py-5 ">
        Our Latest Popular Products
      </h2>
      <div className="mx-auto w-11/12 grid grid-cols-3 gap-5 py-5 ">
        {products.map((singleProduct) => (
          <SingleProduct
            key={singleProduct._id}
            singleProduct={singleProduct}
          ></SingleProduct>
        ))}
      </div>
      <Link to="/products" className="btn btn-accent px-8 py-5 text-white">
        Show All Products
      </Link>
    </div>
  );
};

export default Products;
