import React, { useEffect, useState } from "react";
import SingleProduct from "../Components/SingleProduct";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, []);
  return (
    <div>
      <div className="mx-auto w-11/12 grid grid-cols-3 gap-5 py-5 ">
        {products.map((singleProduct) => (
          <SingleProduct
            key={singleProduct._id}
            singleProduct={singleProduct}
          ></SingleProduct>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
