"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "~/components/Button";
import assessmentData from "~/data/assessment.json";
import { toast } from "react-toastify";

const HomePage = () => {
   const router = useRouter();
   const emailRef = useRef<HTMLInputElement>(null);

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!emailRef.current?.value) {
         toast.warning("Vui lòng nhập Email.");
         return;
      }
      router.push(`/assessment?=${emailRef.current.value}`);
   };

   return (
      <div className="max-w-screen-md h-full mx-auto my-16 px-6">
         <h2 className="mb-12 text-subtitle uppercase text-center">
            {assessmentData.title}
         </h2>
         <section className="text-center">
            <h1 className="font-bold text-2xl mb-8">
               {assessmentData.description}
            </h1>
            <p className="text-subtitle mb-5">
               Đánh giá khả năng của bạn trong việc lắng nghe, hiểu và đáp ứng
               các tín hiệu từ khách hàng.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
               <input
                  ref={emailRef}
                  type="email"
                  id="email"
                  className="border-2 border-gray-300 text-black text-sm rounded block w-full p-2.5 outline-none focus:border-primary focus:border-2"
                  placeholder="Địa chỉ email của bạn"
                  // required
               />
               <Button type="submit">Bắt Đầu</Button>
            </form>
         </section>
      </div>
   );
};

export default HomePage;
