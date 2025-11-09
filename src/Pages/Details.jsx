import React from "react";
import { useLoaderData } from "react-router-dom";

const Details = () => {
  const product = useLoaderData();
  const { name, price, origin_country, image, rating, available_quantity } =
    product;

  return (
    <div>
      <div className="w-11/12 md:w-9/12 mx-auto py-12">
        <div className="card lg:card-side bg-base-200 shadow-xl">
          {/* Product Image */}
          <figure className="lg:w-1/2 p-5">
            <img
              src={image}
              alt={name}
              className="rounded-xl w-auto max-w-full h-full object-cover"
            />
          </figure>

          {/* Product Details */}
          <div className="card-body lg:w-1/2 p-8">
            <h2 className="card-title text-4xl font-bold">{name}</h2>
            <p className="text-gray-600 text-lg mt-2">
              Origin: <span className="font-medium">{origin_country}</span>
            </p>
            <p className="text-gray-600 text-lg mt-1">
              Available Quantity:{" "}
              <span className="font-medium">{available_quantity}</span>
            </p>
            <p className="text-gray-600 text-lg mt-1">
              Rating:{" "}
              <span className="font-medium text-yellow-500">{rating} ⭐</span>
            </p>
            <p className="text-3xl font-bold text-accent mt-4">${price}</p>

            <div className="card-actions mt-6">
              <button className="btn btn-accent btn-lg w-full">Buy Now</button>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-base-100 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-3">Product Description</h3>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            condimentum metus ut orci lacinia, nec facilisis sapien ullamcorper.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. This
            product is high quality and comes directly from{" "}
            <span className="font-medium">{origin_country}</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
