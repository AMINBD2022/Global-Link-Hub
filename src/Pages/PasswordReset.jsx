import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";
import Title from "../utilities/Title";
import { Mail } from "lucide-react";

const ResetPassword = () => {
  const { resetPass } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const handleReset = async (data) => {
    try {
      await resetPass(data.email);
      toast.success("Password reset email sent! Check your inbox 📧");
    } catch (err) {
      console.error(err);
      toast.error(
        err.code === "auth/user-not-found"
          ? "No account found with this email"
          : "Something went wrong. Try again."
      );
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <Helmet>
        <title>Reset Password</title>
      </Helmet>

      <div className="">
        <div className="card-body max-w-[480px] border rounded-2xl border-gray-200">
          <Title> Reset Password</Title>
          <p className="text-sm opacity-70 mb-4">
            Enter your registered email and we'll send you a reset link.
          </p>

          <form onSubmit={handleSubmit(handleReset)} className="space-y-4">
            <label className="label mb-1">Email Address</label>
            <label className="input w-full focus-within:outline-none">
              <Mail />
              <input
                type="email"
                required
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
            </label>
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-accent w-full text-white"
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="divider">OR</div>

          <p className="text-center text-sm">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-accent font-semibold hover:underline"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
