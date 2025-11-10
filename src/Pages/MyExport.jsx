import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Contexts/AuthContext";
import Loading from "../Components/Loading";

const MyExport = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/products?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, [user.email]);

  const deleteProductHandle = (id) => {
    console.log("deleted selected", id);
  };
  return (
    <div className="w-11/12 mx-auto pt-5">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Products Details</th>
              <th>Seller</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {products.map((product, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td className="flex-1">
                  <div className="flex items-start gap-3">
                    <img
                      className="w-60 h-auto aspect-2/1 rounded-2xl shadow-sm object-cover"
                      src={product.image}
                      alt={product.name}
                    />
                    <div>
                      <div className="font-bold text-lg">{product.name}</div>
                      <div className="text-sm">
                        <strong>Origin Country</strong> :{" "}
                        {product.origin_country}
                      </div>
                      <div className="flex gap-4">
                        {" "}
                        <div className="text-sm">
                          <strong>Price</strong> : {product.price}
                        </div>
                        <div className="text-sm">
                          <strong>Rating</strong> : {product.origin_country}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.displayName}</td>
                <td>
                  <button className="btn btn-success">Update</button>
                </td>
                <th>
                  <button
                    onClick={() => deleteProductHandle(product._id)}
                    className="btn btn-accent"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default MyExport;
