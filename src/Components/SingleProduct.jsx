import React from "react";
import { Link } from "react-router-dom";

const SingleProduct = ({ singleProduct }) => {
  const { name, image, rating } = singleProduct;

  return (
    <div className="card bg-base-100 w-full shadow-sm">
      <figure className="px-10 pt-10">
        <img
          src={image}
          alt="Shoes"
          className="rounded-xl w-full h-auto aspect-2/1 object-cover border border-gray-200"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <h2 className="card-title"> Product Rating : {rating}</h2>
        <div className="card-actions">
          <Link to={`/details/${singleProduct._id}`}>
            <button className="btn btn-accent">View Deails</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
