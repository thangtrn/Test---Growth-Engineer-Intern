"use client";
import React, { useState } from "react";
import AssessmentCard from "~/components/AssessmentCard";
import Button from "~/components/Button";
import GlassCardWrapper from "~/components/GlassCardWrapper";
import assessmentData from "~/data/assessment.json";

const AssessmentPage = () => {
   const [selectedQuestion, setSelectedQuestion] = useState<null | number>(
      null
   );

   return (
      <div className="max-w-screen-md h-full mx-auto my-16 px-6">
         <h2 className="mb-12 text-subtitle uppercase text-center">
            {assessmentData.title}
         </h2>
         {selectedQuestion === null ? (
            <GlassCardWrapper
               header={
                  <div className="f-center gap-2 mb-4">
                     <span className="inline-block size-2 rounded-full bg-primary" />
                     <h6 className="text-md uppercase">
                        Hướng dẫn trả lời câu hỏi
                     </h6>
                  </div>
               }
            >
               <div className="space-y-3">
                  <h3 className="font-medium">
                     Hãy dựa vào hướng dẫn sau để trả lời câu hỏi:
                  </h3>
                  <ul className="font-light list-disc ml-5">
                     <li>
                        Chọn &quot;Có&quot; : nếu câu đó phản ánh hiện trạng
                        đang có VÀ được thực hiện một cách nhất quán (ít nhất
                        80% thời gian)
                     </li>
                     <li>
                        Chọn &quot;Không có&quot; : nếu hoàn toàn chưa từng thực
                        hiện.
                     </li>
                     <li>
                        Chọn &quot;Không rõ về vấn đề này&quot; nếu không chắc
                        chắn đã thực hiện hay chưa
                     </li>
                  </ul>
                  <Button onClick={() => setSelectedQuestion(1)}>
                     Bắt Đầu
                  </Button>
               </div>
            </GlassCardWrapper>
         ) : (
            <AssessmentCard
               // title navigate
               currentQuestion={selectedQuestion}
               totalQuestion={assessmentData.questions.length}
               // option
               options={assessmentData.questions[1].options}
               selectedOption={1}
               // action
               onPreviousClick={() => console.log("Previous")}
               onNextClick={() => console.log("Next")}
               onSubmit={() => console.log("is submit")}
            />
         )}
      </div>
   );
};

export default AssessmentPage;
