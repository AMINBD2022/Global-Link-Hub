import { LuCirclePlus } from "react-icons/lu";

const AddProductForm = ({
  register,
  handleSubmit,
  handleProduct,
  preview,
  loading,
}) => {
  return (
    <div>
      <form
        onSubmit={handleSubmit(handleProduct)}
        className="card-body space-y-6"
      >
        {/* Product Info */}
        <div>
          <h3 className="font-semibold text-base-content mb-3">
            Product Information
          </h3>

          <input
            {...register("name", { required: true })}
            className="input input-bordered w-full bg-base-100 focus:ring-2 focus:ring-primary"
            placeholder="Product Name"
          />

          <input
            type="file"
            accept="image/*"
            {...register("file", { required: true })}
            className="file-input file-input-bordered w-full bg-base-100 mt-3"
          />

          <p className="text-xs text-secondary mt-1">
            JPG, PNG or WEBP (Max 5MB)
          </p>

          {/* Image Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 rounded-xl max-h-48 object-cover border border-base-300"
            />
          )}
        </div>

        {/* Pricing */}
        <div>
          <h3 className="font-semibold text-base-content mb-3">
            Pricing & Stock
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="number"
              {...register("price", { required: true })}
              className="input input-bordered w-full bg-base-100 no-spinner"
              placeholder="Price ($)"
            />

            <input
              type="number"
              {...register("quantity", { required: true })}
              className="input input-bordered w-full bg-base-100 no-spinner"
              placeholder="Stock Quantity"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <input
              {...register("originCountry")}
              className="input input-bordered w-full bg-base-100"
              placeholder="Origin Country"
            />

            <input
              type="number"
              step="0.1"
              {...register("rating")}
              className="input input-bordered w-full bg-base-100 no-spinner"
              placeholder="Rating (0-5)"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-semibold text-base-content mb-3">Description</h3>
          <textarea
            {...register("description")}
            className="textarea textarea-bordered w-full bg-base-100"
            placeholder="Short product description..."
          />
        </div>

        {/* CTA */}
        <button
          disabled={loading}
          className="btn btn-accent w-full text-white text-lg rounded-xl tracking-wide"
        >
          {loading ? "Uploading..." : "Add Product"}
          <LuCirclePlus className="ml-2" />
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
