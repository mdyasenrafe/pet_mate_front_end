"use client";

import React from "react";
import { FaPaw } from "react-icons/fa";
import { Button, Text } from "@/components/atoms";
import { FormWrapper } from "@/components/form/FormWrapper";
import { FormInput } from "@/components/form/FormInput";
import Link from "next/link";
import { SubmitHandler } from "react-hook-form";
import {
  TSignupValue,
  addUser,
  useSignupMutation,
} from "@/redux/features/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux";
import { toast } from "sonner";
import { FormUpload } from "@/components/form";
import { useImageUploadMutation } from "@/api/updloadApi";
import { signupSchema } from "@/Schema";
import { zodResolver } from "@hookform/resolvers/zod";

const Signup = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [imageUpload, { isLoading: imageLoading }] = useImageUploadMutation();
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit: SubmitHandler<TSignupValue> = async (data) => {
    try {
      console.log("Submitting signup form...");
      if (data.profilePicture) {
        const thumbRes = await imageUpload({
          file: data.profilePicture,
        }).unwrap();

        if (thumbRes?.data?.url) {
          data.profilePicture = thumbRes.data.url;
        } else {
          toast.error("Something went wrong! Please try again");
        }

        const res = await signup(data).unwrap();
        dispatch(addUser({ user: res.data, token: res.token as string }));
        toast.success(res?.message);
        router.push(redirect);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to sign up. Please try again.");
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
          Create Your Account
        </Text>
        <Text className="text-gray-600 text-center mb-8" variant="p5">
          Join our community of pet lovers and access expert care tips and
          heartwarming stories.
        </Text>

        <FormWrapper onSubmit={onSubmit} resolver={zodResolver(signupSchema)}>
          <FormInput
            name="name"
            label="Full Name"
            placeholder="Enter your full name"
          />
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
          <FormUpload name="profilePicture" label="Upload profile picture" />

          <Button
            htmlType="submit"
            customColor="primary"
            className="w-full !h-[44px] hover:bg-primary-dark transition duration-300 mt-4"
            loading={isLoading || imageLoading}
            disabled={isLoading || imageLoading}
          >
            <Text className="text-white" variant="p3">
              Sign Up
            </Text>
          </Button>
        </FormWrapper>

        <Text className="text-center text-sm text-gray-600 mt-6" variant="p5">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-primary hover:underline hover:text-[#9747ff]"
          >
            Sign in
          </Link>
        </Text>
      </div>
    </div>
  );
};

export default Signup;
