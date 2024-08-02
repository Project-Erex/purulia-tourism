"use client";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import supabase from "@/config/supabaseClient";
import {useState} from "react";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [loading, setLoading] = useState(false);
  const onSubmit = async (data, e) => {
    setLoading(true);
    try {
      const {error} = await supabase
        .from("contact")
        .insert([{name: data.name, phone: data.mobile, message: data.message}]);

      if (error) throw error;

      // Clear the form fields on successful submission
      e.target.reset();

      // Optionally, handle successful submission, e.g., show a success message
      console.log("Data inserted successfully:", data);
    } catch (error) {
      console.error("Error inserting data:", error.message);

      // Clear the form fields on error
      e.target.reset();

      // Optionally, handle error, e.g., show an error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center">
      <div className="max-w-5xl px-4 xl:px-0 py-10 lg:py-20 mx-auto">
        <div className="max-w-3xl mb-10 lg:mb-14">
          <h2 className="font-semibold text-2xl md:text-4xl md:leading-tight">
            Contact us
          </h2>
          <p className="mt-1 ">Whatever your goal - we will get you there.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16">
          <div className="md:order-2  border-neutral-800 pb-10 mb-10 md:border-b-0 md:pb-0 md:mb-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    id="hs-tac-input-name"
                    className={` ${errors.name ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Name"
                    {...register("name", {required: "Name is required"})}
                  />

                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div className="relative">
                  <Input
                    type="text"
                    id="hs-tac-input-phone"
                    className={`${errors.mobile ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Phone"
                    {...register("mobile", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: "Invalid mobile number",
                      },
                    })}
                  />

                  {errors.mobile && (
                    <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
                  )}
                </div>

                <div className="relative">
                  <Textarea
                    id="hs-tac-message"
                    className={`${errors.message ? "border-red-500" : "border-gray-300"}`}
                    placeholder="This is a textarea placeholder"
                    {...register("message", {
                      required: "Message is required",
                    })}></Textarea>

                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-2">
                <p className="text-xs text-neutral-500">All fields are required</p>

                <p className="mt-5">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-opacity-80 text-[16px] px-6 py-3 rounded-full text-background font-DMSans w-[105px] flex items-center justify-center"
                    disabled={loading}>
                    {loading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </p>
              </div>
            </form>
          </div>

          <div className="space-y-14">
            <div className="flex gap-x-5">
              <svg
                className="flex-shrink-0 size-6 text-neutral-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div className="grow">
                <h4 className=" text-sm font-semibold">Who are we ?</h4>
                <p className=" mt-1 text-sm">
                  We are @Erex Studio we do Business Software Solutions{" "}
                </p>
              </div>
            </div>

            <div className="flex gap-x-5">
              <svg
                className="flex-shrink-0 size-6 text-neutral-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="m22 2-11 11" />
                <path d="M22 2 15 22l-4-9-9-4L22 2Z" />
              </svg>
              <div className="grow">
                <h4 className=" text-sm font-semibold">Email us</h4>
                <p className=" mt-1 text-sm">support@erexstudio.com</p>
              </div>
            </div>

            <div className="flex gap-x-5">
              <svg
                className="flex-shrink-0 size-6 text-neutral-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="m22 2-11 11" />
                <path d="M22 2 15 22l-4-9-9-4L22 2Z" />
              </svg>
              <div className="grow">
                <h4 className=" text-sm font-semibold">Phone</h4>
                <p className=" mt-1 text-sm">(316) 555-0116</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
