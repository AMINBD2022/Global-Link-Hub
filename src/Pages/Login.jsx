import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdLogin, MdEmail, MdLock } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Title from "../utilities/Title";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { loginWithEmailPass, userWithGoogle } = useAuth();

  const loginHandle = async (data) => {
    try {
      await loginWithEmailPass(data.email, data.password);
      toast.success("Welcome back!");
      navigate(location.state || "/");
    } catch (err) {
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setError("password", {
          type: "manual",
          message: "Invalid email or password",
        });
        toast.error("Invalid email or password");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleGoogleUser = async () => {
    try {
      await userWithGoogle();
      toast.success("Login successful!");
      navigate(location.state || "/");
    } catch {
      toast.error("Google login failed");
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Global Link Hub</title>
      </Helmet>

      <div className="min-h-screen bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-4xl w-full bg-base-100 rounded-2xl shadow overflow-hidden">
          {/* Left Branding Section */}
          <div className="hidden lg:flex flex-col justify-center p-10 bg-secondary text-white">
            <Title>Welcome Back 🧑‍💻</Title>
            <p className="opacity-90 text-lg">
              Sign in to manage your products, inventory and dashboard.
            </p>
          </div>

          {/* Right Form Section */}
          <div className="p-8 md:p-10">
            <h2 className="text-2xl font-bold text-center mb-2">
              Login to your account
            </h2>
            <p className="text-center opacity-70 mb-6">
              Enter your credentials to continue
            </p>

            <form onSubmit={handleSubmit(loginHandle)} className="space-y-4">
              {/* Email */}
              <div>
                <label className="label">Email</label>
                <div className="relative">
                  <MdEmail className="absolute top-1/2 -translate-y-1/2 left-3 opacity-60" />
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="input input-bordered w-full pl-4"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <MdLock className="absolute top-1/2 -translate-y-1/2 left-3 opacity-60" />
                  <input
                    type={show ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="input input-bordered w-full pl-4"
                    placeholder="••••••••"
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute top-1/2 -translate-y-1/2 right-4 text-sm cursor-pointer z-20 opacity-70 hover:opacity-100"
                  >
                    {show ? "Hide" : "Show"}
                  </span>
                </div>

                {errors.password && (
                  <p className="text-error text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot */}
              <div className="text-right">
                <Link
                  to="/reset"
                  className="text-sm cursor-pointer hover:underline opacity-70"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                disabled={isSubmitting}
                className="btn btn-accent w-full text-white text-lg"
              >
                {isSubmitting ? (
                  "Logging in..."
                ) : (
                  <>
                    Login <MdLogin />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="divider my-6">OR</div>

            {/* Google Login */}
            <button
              onClick={handleGoogleUser}
              className="btn btn-outline w-full flex items-center gap-2"
            >
              <FcGoogle size={20} />
              Continue with Google
            </button>

            {/* Register */}
            <p className="text-center mt-6">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-accent font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
