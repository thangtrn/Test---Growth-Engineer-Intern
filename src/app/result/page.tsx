import Image from "next/image";
import React from "react";
import CircularProgress from "~/components/CircularProgress";
import GlassCardWrapper from "~/components/GlassCardWrapper";
import assessmentData from "~/data/assessment.json";
import SharedSticky from "./_components/SharedSticky";
import { redirect } from "next/navigation";
import assessmentResults from "~/data/result.json";
import { IResult } from "~/interfaces/assessment";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
   params: { id: string };
   searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
   { searchParams }: Props,
   parent: ResolvingMetadata
): Promise<Metadata> {
   const assessmentResult: IResult | undefined = assessmentResults.find(
      (item) => item.email === searchParams.email
   );

   const finalResult = assessmentData.results.find(
      (item) => item.level === assessmentResult?.level
   )!;

   return {
      title: `Final result | ${assessmentResult?.email}`,
      description: finalResult.description.text || "",
      openGraph: {
         images: [`/images/Thumbnail-Level-${assessmentResult?.level}.jpg`],
      },
   };
}

const ResultPage = async ({ searchParams }: Props) => {
   const assessmentResult: IResult | undefined = assessmentResults.find(
      (item) => item.email === searchParams.email
   );
   if (!assessmentResult) {
      redirect("/");
   }

   const finalResult = assessmentData.results.find(
      (item) => item.level === assessmentResult.level
   )!;

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
                           src={finalResult?.icon}
                           alt=""
                           width={64}
                           height={64}
                           className="image-cover"
                        />
                     </div>
                     <div className="uppercase">
                        <span>
                           Voice of the customer - Cấp độ {finalResult.level}
                        </span>
                        <h3 className="text-2xl font-bold">
                           {finalResult.name}
                        </h3>
                     </div>
                  </div>
               }
            >
               <div className="space-y-3">
                  <p className="text-subtitle">
                     {finalResult.description.text}
                  </p>
                  <CircularProgress score={assessmentResult.score} />
               </div>
            </GlassCardWrapper>
         </div>
         <SharedSticky />
      </>
   );
};

export default ResultPage;
