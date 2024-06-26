import Image from "next/image";
import React from "react";
import CircularProgress from "~/components/CircularProgress";
import GlassCardWrapper from "~/components/GlassCardWrapper";
import assessmentData from "~/data/assessment.json";
import SharedSticky from "./_components/SharedSticky";

const ResultPage = () => {
   return (
      <>
         <div className="max-w-screen-md h-full mx-auto my-16 px-6">
            <h2 className="mb-12 text-subtitle uppercase text-center">
               {assessmentData.title}
            </h2>

            <GlassCardWrapper
               header={
                  <div className="flex gap-3 mb-4">
                     <div className="flex-shrink-0 size-12 bg-white rounded-full p-2">
                        <Image
                           src={assessmentData.results[2].icon}
                           alt=""
                           width={64}
                           height={64}
                           className="image-cover"
                        />
                     </div>
                     <div className="uppercase">
                        <span>
                           Voice of the customer - Cấp độ{" "}
                           {assessmentData.results[2].level}
                        </span>
                        <h3 className="text-2xl font-bold">Performing</h3>
                     </div>
                  </div>
               }
            >
               <div className="space-y-3">
                  <p className="text-subtitle">
                     {assessmentData.results[2].description.text}
                  </p>
                  <CircularProgress progress={0.55} />
               </div>
            </GlassCardWrapper>
         </div>
         <SharedSticky />
      </>
   );
};

export default ResultPage;
