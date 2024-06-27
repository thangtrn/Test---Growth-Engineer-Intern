import React, { Suspense } from "react";
import assessmentData from "~/data/assessment.json";
import AssessmentTest from "./_components/AssessmentTest";

const AssessmentPage = () => {
   return (
      <div className="max-w-screen-md h-full mx-auto my-16 px-6">
         <h2 className="mb-12 text-subtitle uppercase text-center">
            {assessmentData?.title}
         </h2>
         <Suspense>
            <AssessmentTest />
         </Suspense>
      </div>
   );
};

export default AssessmentPage;
