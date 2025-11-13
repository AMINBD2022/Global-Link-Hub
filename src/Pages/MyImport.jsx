import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import AuthContext from "../Contexts/AuthContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { IoIosRemoveCircle } from "react-icons/io";
import Loading from "../Components/Loading";

const MyImport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(
      `https://global-link-hub.vercel.app/importedProducts?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, [user?.email]);

  const deleteProductHandle = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://global-link-hub.vercel.app/importedProducts/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const reminingProducts = products.filter((p) => p._id != id);
              setProducts(reminingProducts);
              Swal.fire({
                title: "Removed!",
                text: "Your Product has been Removed.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto pt-5">
      <Helmet>
        <title>My Import</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          {products.length === 0 ? (
            <div className="text-center py-10">
              <h2 className="text-2xl font-semibold text-gray-600">
                No Products Available
              </h2>
              <p className="text-gray-500 mt-2">
                You haven't added any products yet. Add a product to see it
                here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead className="text-center">
                  <tr className="text-2xl text-accent">
                    My All Imports - {products.length}
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}

                  {products.map((product) => (
                    <tr key={product._id} className="grid grid-cols-2 md:table">
                      <td className="lg:max-w-2/12 lg:w-full">
                        <img
                          className="w-full max-w-[250px] h-auto aspect-2/1 rounded-2xl shadow-sm object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                      </td>
                      <td className="lg:max-w-6/12 lg:w-full">
                        <div>
                          <h2 className="font-bold md:text-lg">
                            {product.name}
                          </h2>
                          <h2 className="text-sm">
                            <strong>Origin Country</strong> :
                            {product.origin_country}
                          </h2>
                          <h2 className="flex gap-4 text-sm">
                            <strong>Price</strong> : {product.price}
                          </h2>
                          <h2>
                            <strong>Available quantity</strong> :
                            {product.imported_quantity}
                          </h2>
                          <h2>
                            <strong>Rating</strong> : {product.rating}
                          </h2>
                        </div>
                      </td>
                      <td>
                        <Link to={`/viewDetails/${product._id}`}>
                          <button className="btn btn-success text-white">
                            View Deails
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteProductHandle(product._id)}
                          className="btn btn-accent text-white"
                        >
                          Remove <IoIosRemoveCircle />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyImport;
