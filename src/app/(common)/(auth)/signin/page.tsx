"use client";

import React from "react";
import { FaPaw } from "react-icons/fa";
import { Button, Text } from "@/components/atoms";
import { FormWrapper } from "@/components/form/FormWrapper";
import { FormInput } from "@/components/form/FormInput";
import Link from "next/link";
import { SubmitHandler } from "react-hook-form";
import { TSigninValue, addUser, useLoginMutation } from "@/redux/features/auth";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux";
import { toast } from "sonner";

const SignIn = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit: SubmitHandler<TSigninValue> = async (data) => {
    try {
      console.log("Submitting form...");
      const res = await login(data).unwrap();
      dispatch(addUser({ user: res.data, token: res.token as string }));
      toast.success(res?.message);
      router.push("/");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to login. Please try again.");
    }
  };

  return (
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

        <FormWrapper onSubmit={onSubmit}>
          <FormInput
            name="email"
            label="Email Address"
            placeholder="Enter your email"
          />
          <FormInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          <div className="flex justify-end items-center mt-2">
            <Link
              href={""}
              className="text-sm text-primary hover:underline hover:!text-[#9747ff]"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            htmlType="submit"
            customColor="primary"
            className="w-full !h-[44px] hover:bg-primary-dark transition duration-300 mt-4"
            loading={isLoading}
            disabled={isLoading}
          >
            <Text className="text-white " variant="p3">
              Sign In
            </Text>
          </Button>
        </FormWrapper>

        <Text className="text-center text-sm text-gray-600 mt-6" variant="p5">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-primary hover:underline hover:text-[#9747ff]"
          >
            Sign up
          </Link>
        </Text>
      </div>
    </div>
  );
};

export default SignIn;
