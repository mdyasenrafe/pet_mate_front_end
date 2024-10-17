import React from "react";
import { FaPaw } from "react-icons/fa";
import { Text } from "@/components/atoms";

const SignIn = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center lg:min-h-screen lg:bg-gray-100 p-4">
        <div className="flex items-center mb-6">
          <FaPaw className="text-5xl text-primary" />
          <Text className="ml-3 text-primary" variant="h1">
            PetMate
          </Text>
        </div>

        <div className="w-full max-w-md bg-white rounded-lg shadow-md border p-6">
          <Text
            className="text-2xl font-bold text-gray-800 text-center mb-4"
            variant="h2"
          >
            Welcome Back
          </Text>
          <Text className="text-gray-600 text-center mb-8" variant="p5">
            Join our community of pet lovers and access expert care tips and
            heartwarming stories.
          </Text>

          {/* SignIn Form */}
          <form className="space-y-4">
            <div>
              <Text
                className="block text-sm font-medium text-gray-700"
                variant="p5"
              >
                Email Address
              </Text>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <Text
                className="block text-sm font-medium text-gray-700"
                variant="p5"
              >
                Password
              </Text>
              <input
                type="password"
                placeholder="Enter your password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="flex justify-between items-center mt-2">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-primary" />
                <Text className="ml-2 text-sm text-gray-600" variant="p5">
                  Remember me
                </Text>
              </label>

              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-primary-dark transition duration-300"
            >
              <Text className="text-white" variant="p3">
                Sign In
              </Text>
            </button>
          </form>

          {/* Sign Up Link */}
          <Text className="text-center text-sm text-gray-600 mt-6" variant="p5">
            Don’t have an account?{" "}
            <a href="/register" className="text-primary hover:underline">
              Sign up
            </a>
          </Text>
        </div>
      </div>

      <div className="h-screen"></div>
    </div>
  );
};

export default SignIn;
