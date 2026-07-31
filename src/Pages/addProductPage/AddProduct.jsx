import { FaBoxOpen } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import AddProductForm from "./Form";

const AddProduct = () => {
  const { user } = useAuth();
  const axiosURL = useAxios();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const { register, handleSubmit, reset, watch } = useForm();

  // Image preview
  const imageFile = watch("file")?.[0];
  if (imageFile && !preview) {
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(imageFile);
  }

  const handleProduct = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", data.file[0]);

      const imageBB = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        formData
      );

      const newProduct = {
        name: data.name,
        image: imageBB.data.data.url,
        price: Number(data.price),
        origin_country: data.originCountry,
        rating: Number(data.rating),
        availableQuantity: Number(data.quantity),
        description: data.description,
        seller_email: user?.email,
      };

      const res = await axiosURL.post("/products", newProduct);

      if (res.data?.insertedId) {
        reset();
        setPreview(null);
        Swal.fire({
          icon: "success",
          title: "Product Added Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-3">
            <FaBoxOpen size={26} />
          </div>
          <h1 className="text-3xl font-bold text-base-content">
            Add New Product
          </h1>
          <p className="text-sm text-secondary mt-1">
            Upload product details and publish instantly
          </p>
        </div>

        {/* Card */}
        <div className="card bg-base-100/90 backdrop-blur shadow-xl border border-base-300 rounded-2xl hover:shadow-2xl transition">
          <AddProductForm
            register={register}
            handleSubmit={handleSubmit}
            handleProduct={handleProduct}
            preview={preview}
            loading={loading}
          />
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
