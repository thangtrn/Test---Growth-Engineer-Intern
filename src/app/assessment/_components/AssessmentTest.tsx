"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AssessmentCard from "~/components/AssessmentCard";
import Button from "~/components/Button";
import GlassCardWrapper from "~/components/GlassCardWrapper";
import assessmentData from "~/data/assessment.json";
import { IQuestion, IResult } from "~/interfaces/assessment";

const AssessmentTest = () => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const email = searchParams.get("email");

   const [isLoading, setIsLoading] = useState(false);

   const [questions, setQuestions] = useState<IQuestion[]>(() => {
      return assessmentData.questions.map((item) => ({
         ...item,
         answer: null,
      }));
   });

   const [selectedIndexQuestion, setSelectedIndexQuestion] = useState<
      null | number
   >(null); // index

   useEffect(() => {
      const fetchResult = async () => {
         try {
            const res = await fetch(`/api/result?email=${email}`);
            const result = await res.json();
            if (result?.data !== null) {
               toast.warning("Bạn đã làm bài test rồi.");
               return router.replace(`/result?email=${email}`);
            }
         } catch (error) {
            toast.error("Đã có lỗi");
         }
      };
      fetchResult();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [email]);

   const handlePreviousClick = useCallback(() => {
      if (selectedIndexQuestion === 0) {
         setSelectedIndexQuestion(null);
      } else if (selectedIndexQuestion !== null) {
         setSelectedIndexQuestion(selectedIndexQuestion - 1);
      }
   }, [selectedIndexQuestion]);

   const handleNextClick = useCallback(() => {
      if (
         selectedIndexQuestion !== null &&
         selectedIndexQuestion < questions.length - 1
      ) {
         setSelectedIndexQuestion(selectedIndexQuestion + 1);
      }
   }, [questions?.length, selectedIndexQuestion]);

   const handleSelectedOption = useCallback(
      (id: number) => {
         const newData = [...questions];
         newData[selectedIndexQuestion as number].answer = id;
         setQuestions(newData);
      },
      [questions, selectedIndexQuestion]
   );

   const handleSubmit = async () => {
      if (questions.some((item) => item.answer === null)) {
         return toast.warning("Vui lòng điền đầy đủ các câu hỏi");
      }

      const score = questions.reduce(
         (prev, curr, index) =>
            prev + curr.options.find((item) => item.id === curr.answer).score,
         0
      );

      const data: IResult = {
         email: email!,
         questions: questions,
         score: score,
         level: getLevelByScore(score),
      };

      await saveAssessmentResult(data);
   };

   const saveAssessmentResult = async (data: IResult) => {
      try {
         setIsLoading(true);
         await fetch("/api/result", {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
         });
         toast.success("Đã nộp bài");
         router.replace(`/result?email=${email}`);
         setIsLoading(false);
      } catch (error) {
         toast.error("Đã có lỗi vui lòng thử lại sau");
         setIsLoading(false);
      }
   };

   const getLevelByScore = (score: number) => {
      for (const level of assessmentData.results) {
         if (score >= level.range[0] && score <= level.range[1]) {
            return level.level;
         }
      }
      return 1;
   };

   return (
      <>
         {selectedIndexQuestion === null ? (
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
                  <Button onClick={() => setSelectedIndexQuestion(0)}>
                     Bắt Đầu
                  </Button>
               </div>
            </GlassCardWrapper>
         ) : (
            <AssessmentCard
               // title navigate
               currentQuestion={selectedIndexQuestion + 1}
               totalQuestion={questions.length}
               // option
               question={questions[selectedIndexQuestion]}
               selectedOption={questions[selectedIndexQuestion]?.answer}
               onSelectedQuestion={handleSelectedOption}
               // action
               onPreviousClick={handlePreviousClick}
               onNextClick={handleNextClick}
               // submit
               isLoading={isLoading}
               onSubmit={handleSubmit}
            />
         )}
      </>
   );
};

export default AssessmentTest;
